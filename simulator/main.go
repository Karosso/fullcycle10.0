package main

import (
	// "fmt"
	"fmt"
	"log"

	// "github.com/Karosso/fullcycle10.0/simulator/application/route"
	kafka2 "github.com/Karosso/fullcycle10.0/simulator/application/kafka"
	"github.com/Karosso/fullcycle10.0/simulator/infra/kafka"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file!")
	}
}

func main() {
	messageChannel := make(chan *ckafka.Message)
	consumer := kafka.NewKafkaConsumer(messageChannel)

	// go routing, initiate an asyncronous process
	go consumer.Consume()

	for message := range messageChannel {
		fmt.Println(string(message.Value))
		go kafka2.Produce(message)
	}

	// producer := kafka.NewKafkaProducer()
	// kafka.Publish("Hello world", "route.new-direction", producer)

	// for {
	// 	_ = 1
	// }

	// newRoute := route.Route{
	// 	ID:       "1",
	// 	ClientID: "1",
	// }

	// newRoute.LoadPositions()
	// stringJson, _ := newRoute.ExportJsonPositions()
	// fmt.Println(stringJson[1])
}
