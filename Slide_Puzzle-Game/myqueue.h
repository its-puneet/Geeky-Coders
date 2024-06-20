/**** Queue using linked list***/
 
#include <bits/stdc++.h>
#include <assert.h>

// node of tree-linked list
struct Node
{
    Node *next;   // pointer to next node of the list
    Node *parent; // parent node of this node to be pushed to queue
    char *val;               // value contained by the node
    int valMoved;            // value moved to occupy the empty space
};

typedef struct Node queueNode;

typedef struct
{
    queueNode *front; // front of the queue
    queueNode *rear;  // rear of the queue
    int size;
} Queue;

Queue *q;

// returns 1 if queue is empty else 0
int is_empty()
{
    return q->front == NULL;
}

// pushes an elment at back of the queue
void enqueue(char *value, int valueMoved, queueNode *parentNode)
{
    q->size++;
    queueNode *dummy = new queueNode();

    dummy->val = (char *)malloc(sizeof(char) * 10);
    strcpy(dummy->val, value);

    dummy->next = NULL;
    dummy->parent = parentNode;
    dummy->valMoved = valueMoved;

    if (is_empty())
        q->rear = q->front = dummy;
    else
    {
        q->rear->next = dummy;
        q->rear = q->rear->next;
    }
}

// removes the front element from the queue
void dequeue()
{
    // queue should not be empty
    assert(!is_empty());
    q->size--;

    q->front = q->front->next;
}

// returns the element at front of the queue
char *frontVal()
{
    // queue should not be empty
    assert(!is_empty());

    return q->front->val;
}

// returns the node at front of the queue
queueNode *frontNode()
{
    // queue should not be empty
    assert(!is_empty());

    return q->front;
}

// returns the size of the queue
int queueSize()
{
    return q->size;
}

// function to initialize the queue
void initializeQueue()
{
    q = (Queue *)malloc(sizeof(Queue));
    q->front = NULL;
    q->rear = NULL;
    q->size = 0;
}

// reverses a path of parent nodes
queueNode *reversePath(queueNode *head)
{
    queueNode *previousNode = NULL;

    while (head)
    {
        queueNode *Node = head->parent;
        head->parent = previousNode;
        previousNode = head;
        head = Node;
    }

    return previousNode;
}