package kafka

import (
	"encoding/json"
	"log"
	"os"
	"time"

	"github.com/Karosso/fullcycle10.0/simulator/application/route"
	"github.com/Karosso/fullcycle10.0/simulator/infra/kafka"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

// Produce is responsible to publish the positions of each request
// Example of a json request:
//{"clientId":"1","routeId":"1"}
//{"clientId":"2","routeId":"2"}
//{"clientId":"3","routeId":"3"}

func Produce(message *ckafka.Message) {
	producer := kafka.NewKafkaProducer()
	newRoute := route.NewRoute()
	json.Unmarshal(message.Value, &newRoute)

	newRoute.LoadPositions()
	positions, err := newRoute.ExportJsonPositions()
	if err != nil {
		log.Println(err.Error())
	}

	for _, position := range positions {
		kafka.Publish(position, os.Getenv("KafkaProduceTopic"), producer)
		time.Sleep(time.Millisecond * 500)
	}
}
