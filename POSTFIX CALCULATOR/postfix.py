from tkinter import *
root=Tk()
root.title("POSTFIX CALCULATOR")
root.iconbitmap(r'favicon.ico')

class infix_to_postfix:
    precedence={'^':5,'*':4,'/':4,'+':3,'-':3,'(':2,')':1}
    def __init__(self):
        self.items=[]
        self.size=-1
    def push(self,value):
        self.items.append(value)
        self.size+=1
    def pop(self):
        if self.isempty():
            return 0
        else:
            self.size-=1
            return self.items.pop()
    def isempty(self):
        if(self.size==-1):
            return True
        else:
            return False
    def seek(self):
        if self.isempty():
            return false
        else:
            return self.items[self.size]
    def isOperand(self,i):
        if i in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
            return True
        else:
            return False
    def infixtopostfix (self,expr):
        postfix=""
        #print('postfix expression after every iteration is:')
        for i in expr:
            if(len(expr)%2==0):
                print("Incorrect infix expr")
                return False
            elif(self.isOperand(i)):
                postfix +=i
            elif(i in '+-*/^'):
                while(len(self.items)and self.precedence[i]<=self.precedence[self.seek()]):
                    postfix+=self.pop()
                self.push(i)
            elif i == '(':
                self.push(i)
            elif i == ')':
                o=self.pop()
                while o!='(':
                    postfix +=o
                    o=self.pop()
            #print(postfix)
                #end of for
        while len(self.items):
            if(self.seek()=='('):
                self.pop()
            else:
                postfix+=self.pop()
        return postfix

def postfix():
	ans=txt.get()
	s=infix_to_postfix()
	result=s.infixtopostfix(ans)
	if (result!=False):
		result_1=result
		Label_2.config(text=result_1)



Label_1=Label(root, text="ENTER THE INFIX EXPRESSION : ").pack()
txt=Entry(root, text="")
txt.pack()
butt=Button(root, text="CALCULATE", command=postfix).pack()
Label_2=Label(root, text="")
Label_2.pack()
root.mainloop()