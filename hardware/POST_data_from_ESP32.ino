#include<WiFi.h>;
#include<HTTPClient.h>;
#include<ArduinoJson.h>;

const char* ssid = "VITC-EVENT";
const char* password = "Pgm$!2524";

const char* serverName = "http://172.16.41.32:8081/kavach";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(500);
  }
  Serial.print("\nConnected to the WiFi network");
  Serial.print("IP address");
  Serial.println(WiFi.localIP());
}

void loop() {
  if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
      StaticJsonDocument<200> doc;
      doc["mac"]="ABCD";
      doc["id"]=800;

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
}
else{
  Serial.println("Wifi Disconnected");
}
delay(10000);
}
