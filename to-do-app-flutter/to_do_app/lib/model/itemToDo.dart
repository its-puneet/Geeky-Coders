class itemToDo {
  String? ID;
  String? text;
  bool isDone;
  itemToDo({required this.ID, required this.text, this.isDone = false});
  static List<itemToDo> generateDefaultList() {
    return [
      itemToDo(ID: '0', text: 'Morning Routine', isDone: true),
      itemToDo(ID: '1', text: 'Buy Dog food', isDone: true),
      itemToDo(
        ID: '2',
        text: 'Check Emails',
      ),
      itemToDo(
        ID: '3',
        text: 'Team Meeting',
      ),
      itemToDo(
        ID: '4',
        text: 'Work on mobile apps',
      ),
      itemToDo(
        ID: '5',
        text: 'Dinner with Jenna',
      ),
    ];
  }

  static bool searchForIn(String id, List<itemToDo> items) {
    for (itemToDo item in items) {
      if (item.ID == id) {
        return true;
      }
    }
    return false;
  }

  Map toJson() => {
        'ID': ID,
        'text': text,
        'isDone': isDone,
      };

  factory itemToDo.fromJson(dynamic json) {
    return itemToDo(ID: json['ID'], text: json['text'], isDone: json['isDone']);
  }
}
