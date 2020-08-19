import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'songDuration'
})
export class SongDurationPipe implements PipeTransform {

  transform(time: number): string {
    if (time) {
      const partTime = parseInt(time.toString().split('.')[0]);
      let minutes = Math.floor(partTime / 60).toString();
      
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }

      let seconds = (partTime % 60).toString();

      if (seconds.length === 1) {
        seconds = '0' + seconds;
      }       
      
      return minutes + ':' + seconds;
    } else {
      return "0:00";
    }
  }
}