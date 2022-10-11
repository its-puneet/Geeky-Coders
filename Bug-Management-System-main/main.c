//BUG MANAGEMENT SYSTEM
#include <stdio.h>
#include <stdlib.h> 
#include <string.h>
void add_bug();
void read_bug();
void modify_bug();
void delete_bug();
int option();
struct database
      {
            char name[30];
            int quantity;
            int code;
      };
void main()
{
      int c;
      char a='Y'; 
      while(a=='Y')
      {
            c=option();
            switch(c)
{       
                  case 1:
                  add_bug();
                  break;
                  case 2:
                  read_bug();
                  break;
                  case 3:
                  modify_bug();
                  break;
                  case 4:
                  delete_bug();
                  break; 
            }
            printf("\nType 'Y' to continue with operations:");
            scanf("\n%c",&a);
      } 
}
int option()
{
      int ch;
      printf("\nOptions available:");
      printf("\n1 to add bug \n2 to read bug \n3 to modify bug quantity \n4 to remove bug");
      printf("\nEnter choice: ");
      scanf("%d",&ch);
      return ch;
}
void add_bug()
{ 
      struct database bug;
      FILE *ft;
      char x='Y';
      ft=fopen("bug store","a+");
do
      {
            char ch;
            printf("\nEnter bug name,code,quantity to be stored: ");
            scanf("%s %d %d",bug.name,&bug.code,&bug.quantity);
            fprintf(ft,"%s   %d   %d\n",bug.name,bug.code,bug.quantity);
printf("Type 'Y' to repeat the operation\n");
scanf("\n%c",&ch);
x=ch;
      }while(x=='Y');
      fclose(ft);
}
void read_bug() 
{
      struct database bug;
      FILE *ft;
      ft=fopen("bug store","r");
      printf("NAME      CODE      QUANTITY");
      while(feof(ft)==0)
      {
            fscanf(ft,"%s     %d     %d\n",bug.name, &bug.code,&bug.quantity);
            printf("\n%s  %d  %d",bug.name,bug.code,bug.quantity);
}
fclose(ft);
}
void modify_bug()
{
      struct database bug; 
      FILE *ft,*fp;
      ft=fopen("bug store","r");
      fp=fopen("temp","w+");
      int code;
      int quant;
      printf("\nenter the bug code who's quantity is to be modified and the new quantity:\n");
      scanf("%d %d",&code,&quant);
      while(!feof(ft))
      {
            fscanf(ft,"%s     %d     %d\n",bug.name,&bug.code,&bug.quantity);
            if(bug.code!=code)
            fprintf(fp,"%s    %d    %d\n",bug.name,bug.code,bug.quantity); 
            else
            { 
                  bug.quantity=quant;
                  fprintf(fp,"%s  %d  %d\n",bug.name,bug.code,bug.quantity);
             }
}
fclose(ft);
fclose(fp);
remove("bug store");
rename("temp","bug store");
}
void delete_bug()
{
      struct database bug;
      FILE *ft,*fp;
      int code;
      ft=fopen("bug store","r");
      fp=fopen("temp","w+"); 
     printf("\nenter the code of bug to be deleted:\n"); 
      scanf("%d",&code);
      while (!feof(ft))
      {
            fscanf(ft,"%s     %d     %d\n",bug.name,&bug.code,&bug.quantity);
            if(code!=bug.code)
            fprintf(fp,"%s    %d    %d\n",bug.name,bug.code,bug.quantity);
}
fclose(ft);
fclose(fp);
      remove("bug store");
   rename("temp","bug store");
}
