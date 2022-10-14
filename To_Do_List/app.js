const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();

mongoose.connect('mongodb+srv://admin-bharat:test123@cluster0.m0mmsve.mongodb.net/todolistDB');

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({
  name: "Hello"
});
const item2 = new Item({
  name: "Hello2"
});
const item3 = new Item({
  name: "Hello3"
});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
  name: String,
  itemList: [itemSchema]
});
const List = mongoose.model("List", listSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', function(req, res) {
  Item.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully inserted into the DB");
        }
      });
    } else {
      res.render('main', {
        name: "Today",
        verynewItem: foundItems
      });
    }
  })
});
app.get("/favicon.ico", function (req, res) {
 res.redirect("/");
});

app.post('/', function(req, res) {
  itemName = req.body.newItem;
  listName = req.body.List;
  const item = new Item({
    name: itemName
  });
  if (listName == "Today") {
    item.save();
    res.redirect('/');
  } else {
    List.findOne({
      name: listName
    }, function(err, foundList) {
      foundList.itemList.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }

});

app.post('/delete', function(req, res) {
  const checkItemID = req.body.checkbox;
  const listName = req.body.listName;
  if (listName == "Today") {
    Item.findByIdAndRemove(checkItemID, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Data deleted Successfully");
        res.redirect("/");
      }
    });
  }
  else {
    List.findOneAndUpdate({name:listName},{$pull :{itemList:{_id:checkItemID}}},function(err, foundList){
      if (!err) {
        res.redirect("/"+listName);
      }
    });
  }

});

app.get("/:postName", function(req, res) {
  const listName = req.params.postName;
  List.findOne({
    name: listName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: listName,
          itemList: defaultItems
        });
        list.save();
        res.redirect("/" + listName)
      } else {
        res.render("main", {
          name: foundList.name,
          verynewItem: foundList.itemList
        });
      }
    }
  })


});


app.get('/contact', function(req, res) {
  res.render('contact');
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

