import { LightningElement,track } from 'lwc';
import getValue from '@salesforce/apex/KeyValueController.getValue';
export default class GetValueFromKey extends LightningElement {
    @track key;
    @track value;
    @track errors;  
    handleClick(){
        getValue({key:this.key})
        .then(result=>{
            this.value = result;
        })
        .catch(error=>{
            this.errors = error;
        });
    }
    handleChange(event){
        if(event.target.name==='key'){
            this.key = event.target.value;            
        }
    }
}