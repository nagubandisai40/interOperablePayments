import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, ...args: string[]): any {
    var searchStr=args[0];
    var return_array=[];

    if(searchStr==undefined)
    {
      return value;
    }

    for(var i=0;i<value.length;i++)
    {
      if(value[i]['category'].toLowerCase().startsWith(searchStr.toLowerCase()))
      {
        return_array.push(value[i]);
      }
      // console.log("The value of i is ",value[i])
    }
    return return_array;
  }

}
