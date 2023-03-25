#include <esp_now.h>
#include <WiFi.h>
#include<HTTPClient.h>;
#include<ArduinoJson.h>;

const char* ssid = "VITC-EVENT";
const char* password = "Pgm$!2524";

const char* serverName = "http://172.16.41.32:8081/kavach";

int counter=0;

typedef struct struct_message {
  int ID;
  int integer;
}struct_message;

struct_message message;
struct_message sender1;
struct_message sender2;
struct_message sender3;

StaticJsonDocument<200> doc;

struct_message boardsStruct[3] = {sender1, sender2, sender3}; 

void data_receive(const uint8_t * mac_addr, const uint8_t *incomingData, int len) {
  char macStr[18];
  Serial.print("Received from: ");
  snprintf(macStr, sizeof(macStr), "%02x:%02x:%02x:%02x:%02x:%02x",
           mac_addr[0], mac_addr[1], mac_addr[2], mac_addr[3], mac_addr[4], mac_addr[5]);
  Serial.println(macStr);
  memcpy(&message, incomingData, sizeof(message));
  Serial.printf("Board %u: %u bytes\n", message.ID, len);

  boardsStruct[message.ID-1].integer = message.integer;

  Serial.printf("Integer: %d \n", boardsStruct[message.ID-1].integer);
  Serial.println();
  doc["mac"]=macStr;
  doc["id"]=message.ID;
  doc["count"]=counter;
}
 
void setup() {
 
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(500);
  }
  Serial.print("\nConnected to the WiFi network");
  Serial.print("IP address");
  Serial.println(WiFi.localIP());

  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }
  
  esp_now_register_recv_cb(data_receive);
}
 
void loop() {
  if(WiFi.status() == WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;

      String requestBody;
      serializeJson(doc, requestBody);

      http.begin(client, serverName);
//      http.addHeader("Content-Type", "application/x-www-form-urlencoded");

//      int sensorreading = 5;
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST(requestBody);
//      int httpResponseCode = http.POST(httpRequestData);

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);

      http.end();
      counter ++;
}
else{
  Serial.println("Wifi Disconnected");
  ESP.restart();
  counter=0;
  delay(10000);
}
delay(10000);
}
