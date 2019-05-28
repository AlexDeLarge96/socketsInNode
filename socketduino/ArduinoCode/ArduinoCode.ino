int room1= 2;
int room2= 3;

void setup() {
  pinMode(room1,OUTPUT);
  pinMode(room2,OUTPUT);
  Serial.begin(9600);
  digitalWrite(room1,LOW);
  digitalWrite(room2,LOW);
}

String data="";

void loop() {
  data = Serial.readString();
  if(data.length()>0){
    if(data=="changeRoom1"){
      changePinState(room1);
    }
    if(data=="changeRoom2"){
      changePinState(room2);
    }
    Serial.println("Status:" + readStatus());
  }
}

String readStatus() {
  int st1=digitalRead(room1);
  int st2=digitalRead(room2);
  return String(st1) + "," + String(st2);
}

void changePinState(int pin) {
  int st = digitalRead(pin);
  if(st==0) digitalWrite(pin,HIGH);
  else digitalWrite(pin,LOW);
}
