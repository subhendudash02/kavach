#include <esp_now.h>
#include <WiFi.h>
const int PushButton=15;

uint8_t broadcastAddress[] = {0x30, 0xAE, 0xA4, 0x4B, 0x93, 0x58};

typedef struct struct_message {
    int ID;
    int integer;
} struct_message;

struct_message message;

void data_sent(const uint8_t *mac_addr, esp_now_send_status_t status) {
  Serial.print("\r\n Last Send Status:\t");
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
}
 
void setup() {
  Serial.begin(115200);
  pinMode(PushButton, INPUT);
  WiFi.mode(WIFI_STA);

  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }
  
  esp_now_register_send_cb(data_sent);
  
  esp_now_peer_info_t peerInfo;
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;  
  peerInfo.encrypt = false;
         
  if (esp_now_add_peer(&peerInfo) != ESP_OK){
    Serial.println("Failed to add peer");
    return;
  }
}
 
void loop() {
  int Push_button_state = digitalRead(PushButton);
  if ( Push_button_state == HIGH ){
  message.ID = 2;
  message.integer = 987654321;

  esp_err_t outcome = esp_now_send(broadcastAddress, (uint8_t *) &message, sizeof(message));
   
  if (outcome == ESP_OK) {
    Serial.println("Sent with success");
  }
  else {
    Serial.println("Error sending the data");
  }
  }
  else{
    Serial.println("Officer out of bound");
  }
  delay(10000);
}
