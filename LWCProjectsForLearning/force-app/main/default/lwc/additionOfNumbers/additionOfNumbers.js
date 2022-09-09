import { LightningElement, track} from 'lwc';
import getSum from '@salesforce/apex/AdditionController.getSum';
export default class AdditionOfNumbers extends LightningElement {
    @track fNumber;
    @track sNumber;
    @track sum;
    @track errors;  
    handleClick(){
        getSum({firstNumber:this.fNumber,secondNumber:this.sNumber})
        .then(result=>{
            this.sum = result;
        })
        .catch(error=>{
            this.errors = error;
        });
    }
    handleChange(event){
        if(event.target.name==='fstNumber'){
            this.fNumber = event.target.value;            
        }
        else if(event.target.name==='scdNumber'){
            this.sNumber = event.target.value;            
        }
    }
}