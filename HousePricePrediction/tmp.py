import pickle
#file = open("server\temp.pickle","rb")
#object_file = pickle.load(file)
with open(r"server\temp.pickle", "rb") as input_file:
    e = pickle.load(input_file)