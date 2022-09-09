import { LightningElement,track,wire,api } from 'lwc';
import getAccounts from '@salesforce/apex/AccountOperationsController.getAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertAcc from '@salesforce/apex/AccountOperationsController.insertAcc';
import deleteAccount from '@salesforce/apex/AccountOperationsController.deleteAccounts';
import { refreshApex } from '@salesforce/apex';
export default class AccountOperations extends LightningElement {
    Name;
    @api recordId;
    @track accRecords;
    @track account ={};
    @track spinnerStatus =false;
    @track data;
    @track selectedRowId;
    @track isModalOpen = false;
    @track openModalUpdate = false;
    @track isErrorModalOpen =false;
    @track columns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },        
        { label: 'Phone', fieldName: 'Phone', type: 'phone' }      
    ];
@wire (getAccounts) accountRecords(value){
    this.accRecords = value;
    const { data, error } = value;
    if(data){
        this.data = data;            
    }
    else if (error){
        this.data  = undefined;
    }
} 
handleSubmit(event) {
    console.log('onsubmit event recordEditForm'+ event.detail.fields);
}
handleSuccess(event) {
    console.log('onsuccess event recordEditForm', event.detail.id);
}

handleRowSelected(event) {
    const selectedRows = event.detail.selectedRows;
    // Display that fieldName of the selected rows
    for (let i = 0; i < selectedRows.length; i++){
        console.log("You selected: " + selectedRows[i].Id);
        this.selectedRowId =selectedRows[i].Id;
    }
}
handleClick(){
    return refreshApex(this.accRecords);
}

openModal() {
    // to open modal set isModalOpen tarck value as true
    this.isModalOpen = true;
}
closeModal() {
    // to close modal set isModalOpen tarck value as false
    this.isModalOpen = false;
}
closeModalupdate() {
    // to close modal set isModalOpen tarck value as false
    this.openModalUpdate = false;
}

@track openModalDelete = false;
openModalForDelete() {
    // to open modal set isModalOpen tarck value as true
    this.openModalDelete = true;
}
closeModalForDelete() {
    // to close modal set isModalOpen tarck value as false
    this.openModalDelete = false;
}
openModalForUpdate() {
    if(this.selectedRowId != null){
        console.log('inside if');
       // to open modal set isModalOpen tarck value as true
        this.openModalUpdate = true;
    }else{
        this.isErrorModalOpen = true;
    }
   
}
closeModalForUpdate() {
    // to close modal set isModalOpen tarck value as false
    this.openModalUpdate = false;
}
refreshModalupdate() {
    // to close modal set isModalOpen tarck value as false
    //this.openModalUpdate = false;
    this.dispatchEvent(
        new ShowToastEvent({
            title: 'Success',
            message: 'Account Record Edited Successfully',
            variant: 'success',
        }),
        window.location.reload()
       
    );
    this.openModalUpdate = false;
    //return refreshApex(this.accRecords);
}
closeErrorModal() {
    // to close modal set isModalOpen tarck value as false
    this.isErrorModalOpen = false;
}
handlername(event){
    this.Name = event.target.value;
    this.account.Name=this.Name;
}
handlePhone(event){
    this.Phone = event.target.value;
    this.account.Phone=this.Phone;
}
toastEventFire(title,msg,variant,mode){
    const e = new ShowToastEvent({
        title: title,
        message: msg,
        variant: variant,
        mode: mode
    });
    this.dispatchEvent(e);
}
handleForSave(){
    this.spinnerStatus = true;
    this.isModalOpen = false;
    insertAcc({ acc : this.account})
    .then(result =>{
        this.spinnerStatus = false;
        this.toastEventFire('Success','Account Record is Saved','success')
        //window.location.reload()
        return refreshApex(this.accRecords);
    })
    
    .catch(error =>{
        this.error = error.message;
        alert(JSON.stringify(error))
    })
}
handleForDelete(){
    this.spinnerStatus = true;
    this.openModalDelete = false;
    deleteAccount({ accName : this.Name})
    .then(result =>{
        this.toastEventFire('Success','Account Record is Deleted','success')
        //window.location.reload()
        return refreshApex(this.accRecords);
    })
    .catch(error =>{
        this.error = error.message;
        alert(JSON.stringify(error))
    })
}
}