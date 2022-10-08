#include<iostream>

using namespace std;


float convertor(){
    char curr_name1;
    char curr_name2;
    float currency1;
    float currency2;
    curr_level:
    cout<<"enter the curency name : ";
    cin>>curr_name1;
    cout<<endl;
    cout<<"enter the value for that currency : ";
    cin>>currency1;
    cout<<endl;
    switch(curr_name1){
        case 'a':
            curr_level1:
            cout<<"enter currency name in which it needs to be converted :";
            cin>>curr_name2;
            cout<<endl;
            if(curr_name2=='a' || curr_name2=='A'){
                currency2 = currency1*1;
            }
            else if(curr_name2=='b' || curr_name2=='B'){
                currency2 = currency1*73.84;
            }
            else if(curr_name2=='c' || curr_name2=='C'){
                currency2 = currency1*0.85;
            }
            else if(curr_name2=='d' || curr_name2=='D'){
                currency2 = currency1*0.72;
            }
            else{
                cout<<"you have entered wrong value, please type again"<<endl;
                goto curr_level1;
            }
            break;
            
            case 'b':
            curr_level2:
            cout<<"enter currency name in which it needs to be converted :";
            cin>>curr_name2;
            cout<<endl;
            if(curr_name2=='a' || curr_name2=='A'){
                currency2 = currency1*0.01;
            }
            else if(curr_name2=='b' || curr_name2=='B'){
                currency2 = currency1*1;
            }
            else if(curr_name2=='c' || curr_name2=='C'){
                currency2 = currency1*0.01;
            }
            else if(curr_name2=='d' || curr_name2=='D'){
                currency2 = currency1*0.009;
            }
            else{
                cout<<"you have entered wrong value, please type again"<<endl;
                goto curr_level2;
            }
            
            break;
            case 'c':
            curr_level3:
            cout<<"enter currency name in which it needs to be converted :";
            cin>>curr_name2;
            cout<<endl;
            if(curr_name2=='a' || curr_name2=='A'){
                currency2 = currency1*1.16;
            }
            else if(curr_name2=='b' || curr_name2=='B'){
                currency2 = currency1*86.37;
            }
            else if(curr_name2=='c' || curr_name2=='C'){
                currency2 = currency1*1;
            }
            else if(curr_name2=='d' || curr_name2=='D'){
                currency2 = currency1*0.85;
            }
            else{
                cout<<"you have entered wrong value, please type again"<<endl;
                goto curr_level3;
            }
            break;
            
            case 'd':
            curr_level4:
            cout<<"enter currency name in which it needs to be converted :";
            cin>>curr_name2;
            cout<<endl;
            if(curr_name2=='a' || curr_name2=='A'){
                currency2 = currency1*1.37;
            }
            else if(curr_name2=='b' || curr_name2=='B'){
                currency2 = currency1*101.20;
            }
            else if(curr_name2=='c' || curr_name2=='C'){
                currency2 = currency1*1.17;
            }
            else if(curr_name2=='d' || curr_name2=='D'){
                currency2 = currency1*1;
            }
            else{
                cout<<"you have entered wrong value, please type again"<<endl;
                goto curr_level4;
            }
            
            break;
            
        default:{
             cout<<"you have entered wrong value, please type again"<<endl;
                goto curr_level;
        }   break; 
            
    }
    return currency2;
}

int main(){
    
    char start_value;
    char select_again;
    float convertor(void);
    start:
    cout<<"          Welcome To Currency Convertor Application            "<<endl;
    cout<<endl<<endl;
    cout<<"          Please Follow The Given Instructiions               "<<endl;
    cout<<endl;
    cout<<"This Convertor Will Work For Dollar,Rupees,Euro,Pound"<<endl;
    cout<<"Give the following character to get the required currency"<<endl;
    cout<<"DOLLAR : a"<<endl<<"RUPEES : b"<<endl<<"EURO : c"<<endl<<"POUND : d"<<endl;
    cout<<endl;
    cout<<"Enter The Currency To Be Converted"<<endl;
    cout<<"Enter The Value For That Currency"<<endl;
    cout<<"Select The Currency In Which The Value Needs To Be Converted"<<endl<<endl;
    cout<<"             Please press s to start      "<<endl;
    select_choice:
    cin>>start_value;
    if(start_value=='s' || start_value=='S'){
        float final_value = convertor();
        cout<<"The Result Is : "<<final_value<<endl<<endl;
        cout<<"do you want to use the application again ? press y for yes or n for no"<<endl;
        type_again:
        cin>>select_again;
        if(select_again=='y' || select_again=='Y'){
            goto start;
        }
        else if(select_again=='n' || select_again=='N'){
            cout<<"Thank You For Using The Application"<<endl;
        }
        else{
            cout<<"You have entered wrong value , please type again"<<endl;
            goto type_again;
        }
    }
    else{
        cout<<"You did not pressed s, press s to start"<<endl;
        goto select_choice;
    }
    return 0 ;
}
