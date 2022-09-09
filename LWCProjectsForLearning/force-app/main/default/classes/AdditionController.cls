public with sharing class AdditionController{
@AuraEnabled( cacheable = true )  
public static Integer getSum(Integer firstNumber , Integer secondNumber){
    return (firstNumber + secondNumber);
}
}