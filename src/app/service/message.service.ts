import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommentService} from './comment.service';

declare var SockJS;
declare var Stomp;

class MessageType {
  date: any[] = [];
  commentId: string;
  text: string;
  likes: bigint;
  user: string;
}

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  msg: MessageType;
  private headers;
  public stompClient;
  public dataMessage: object[];
  public alreadyAddedLike: object[];
  private messageBody: string[];
  public status: string;
  constructor(private localStorage: LocalStorageService,
              private httpClient: HttpClient,
              private route: ActivatedRoute,
              private commentService: CommentService) {
  }

  initializeWebSocketConnection(newsId): void {
    this.commentService.getComment(newsId).subscribe((data: object[]) => {
      this.dataMessage = data;
      console.log(this.dataMessage);
    });
    const serverUrl = 'http://localhost:8080/api/socket/';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.headers = {
      Authorization: this.localStorage.retrieve('authenticationtoken')
    };

    this.stompClient.connect(this.headers, frame => {
      this.status = frame.command;
      this.stompClient.subscribe(`/message/${newsId}`, (message, headers) => {
        if (message.body) {
          this.buildMessage(message.body);
          this.createLike();
        }
      });
    });
  }
  createLike(): void {
    const objectCheck = {
      userId: this.localStorage.retrieve('userid'),
      check: true
    };
    this.alreadyAddedLike.push(objectCheck);
  }
  incLike(object): void{
    object.likes = object.likes + 1 ;
    console.log(object);
  }
  buildMessage(message): any {
    const separator = '$:';
    this.msg = new MessageType();
    this.msg.date.push(new Date().getFullYear());
    this.msg.date.push(new Date().getMonth());
    this.msg.date.push(new Date().getDay());
    this.msg.date.push(new Date().getHours());
    this.msg.date.push(new Date().getMinutes());
    this.messageBody = message.split(separator);
    this.msg.text = '';
    if (this.messageBody.length === 3){
      this.msg.text = this.messageBody[0];
      this.msg.user = this.messageBody[1];
      this.msg.commentId = this.messageBody[2];
    } else {
      for (let index = 0; index < this.messageBody.length - 2; index++){
        this.msg.text += this.messageBody[index];
      }
      this.msg.user = this.messageBody[this.messageBody.length - 2];
    }
    this.msg.likes = null;
    this.dataMessage.push(this.msg);
    console.log(this.dataMessage, 'after added message');
  }

  sendMessage(message, newsId): void {
    this.headers = {
      Authorization: this.localStorage.retrieve('authenticationtoken')
    };
    this.stompClient.send(`/app/send/message/${newsId}`, this.headers, message);
  }
}
