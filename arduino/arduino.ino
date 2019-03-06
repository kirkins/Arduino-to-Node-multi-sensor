#include "dht.h"
#define dht_apin A0 // Analog Pin sensor is connected to
#define rainPin A5
 
dht DHT;
 
void setup(){
  Serial.begin(9600);
  delay(1000);//Wait before accessing Sensor
  pinMode(rainPin, INPUT);
}//end "setup()"
 
void loop(){
  //Start of Program 
 
    DHT.read11(dht_apin);
    int sensorValue = analogRead(rainPin);
    Serial.print("{\"humidity\":\"");
    Serial.print(DHT.humidity);
    Serial.print("\", \"temperature\":\"");
    Serial.print(DHT.temperature); 
    Serial.print("\", \"moisture\":\"");
    Serial.print(sensorValue);
    Serial.println("\"}");

    
    delay(5000);//Wait 5 seconds before accessing sensor again.
 
  //Fastest should be once every two seconds.
 
}// end loop() 
