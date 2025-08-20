import subprocess
import random

def main():
  love = False
  while(not love):
    answer = input("Do you love me? type yes or no: ")
    if(answer == "yes"):
      love = True
      try:
        process = subprocess.Popen(["node index.js"], shell=True)
        process.wait()
      except Exception as e:
        print(f"An error occurred: {e}")
    else:
      num = random.randint(0, 6)
      print(num)
      match num:
        case 0:
          print("You're so silly 😛")
        case 1:
          print("You hate me 😖")
        case 2:
          print("I'm taking Brandito back 😠")
        case 3:
          print("You have lost cuddle privileges 😤")
        case 4:
          print("Stinky poo 💩")
        case 5:
          print("One A 👊")
        case 6:
          print("")

if __name__ == "__main__":
  main()
  