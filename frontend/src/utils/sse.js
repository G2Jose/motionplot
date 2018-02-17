import Rx from 'rxjs';

export const createSSE$ = () =>
  Rx.Observable.create(observer => {
    if (window.EventSource) {
      const source = new EventSource('http://localhost:3000/stream');
      source.addEventListener(
        'message',
        message => observer.next(JSON.parse(message.data)),
        false
      );
      source.addEventListener('open', console.log, false);
      source.addEventListener(
        'error',
        e => {
          if (e.target.readyState === EventSource.CLOSED) {
            console.log('Disconnected');
          } else if (e.target.readyState === EventSource.CONNECTING) {
            console.log('Connecting...');
          }
        },
        false
      );
    } else console.log("Your browser doesn't support SSE");
  });
