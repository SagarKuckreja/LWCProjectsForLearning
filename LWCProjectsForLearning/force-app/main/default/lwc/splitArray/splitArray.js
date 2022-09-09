import { LightningElement, track } from 'lwc';
import ShowTable from '@salesforce/apex/SplitArrayController.ShowTable';
export default class SplitArray extends LightningElement {
@track arr;
@track errors;
@track value=[];
@track isShowTabel=false;
handleClick(event){
    console.log('this.arr'+JSON.stringify(this.arr));
    ShowTable({str:this.arr})
    .then(result=>{
        this.value = result;
        console.log('value'+this.value);
        this. isShowTabel=true;
    })
    .catch(error=>{
        this.errors = error;
    });
}
handleChange(event){
    if(event.target.name==='Array'){
        this.arr = event.target.value;       
    }
}
}