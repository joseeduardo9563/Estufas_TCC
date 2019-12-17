#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <DHT.h>

#define DHTPIN D1     
#define DHTTYPE DHT22 
#define FIREBASE_HOST "project.firebaseio.com"
#define FIREBASE_AUTH "************************************" //Chave do Firebase
#define WIFI_SSID "Roteador"
#define WIFI_PASSWORD "*******"

DHT dht(DHTPIN, DHTTYPE);

//prototypes
void Envia(float TempLida, float UmidLida, int LeiSolo, float Mili);
void incrpulso();
int Pulso; 
float vazaoagua;
float MiliLitros=0;
int erro=0;


void Envia(float TempLida, float UmidLida, int LeiSolo, float Mili) 
{   
  
    //- Temperatura atual
    Firebase.pushFloat("Temperatura", TempLida); 
    
    //- umidade relativa do ar atual
    Firebase.pushFloat("Umidade", UmidLida); //


    //- Umidade solo    
    Firebase.pushFloat("Umidade-solo", LeiSolo); 
  
  
    //- temperatura minima
    Firebase.pushFloat("MiliLitros", Mili);
    
    //Status
    erro = 0;
    Firebase.pushFloat("Status", erro); 
}

void setup() {

  Serial.begin(115200);    
  pinMode(D4, OUTPUT);
  pinMode(D2, INPUT);
  attachInterrupt(D2, incrpulso, RISING);
   // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("conectando");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("conectado: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  MiliLitros=Firebase.getFloat("MiliLitros");
  dht.begin();
  digitalWrite(D4, HIGH);
}

void loop() {
  float TemperaturaLida;
  float UmidadeLida;
  int LeituraSolo;
  
  
  //Faz a leitura
  TemperaturaLida = dht.readTemperature();
  UmidadeLida = dht.readHumidity();
  LeituraSolo = analogRead(A0);
  

  if (isnan(TemperaturaLida) || isnan(UmidadeLida)) 
  {
    erro = 1;
    Firebase.pushFloat("Status", erro); 
  }
  else
  {
    if(LeituraSolo>700 or TemperaturaLida >31)
    {
      digitalWrite(D4, LOW);
      Pulso = 0;
      sei(); 
      delay (1000);
      cli(); 
      vazaoagua = Pulso / 5.5;
      MiliLitros=(vazaoagua/60)*1000 + MiliLitros;
       
    }    
    else if(LeituraSolo>650 or TemperaturaLida> 27)
    {
      digitalWrite(D4, LOW);
      Pulso = 0; 
      sei();
      delay (1000);
      cli();  
      vazaoagua = Pulso / 5.5;
      MiliLitros=(vazaoagua/60)*1000 + MiliLitros;
    }
    else
    {
      digitalWrite(D4, HIGH);
    }           
    Envia(TemperaturaLida, UmidadeLida, LeituraSolo, MiliLitros);
  }    
  delay(2000);
}
ICACHE_RAM_ATTR void incrpulso()
{ 
  Pulso++;
}
