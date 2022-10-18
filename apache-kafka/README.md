# fullcycle10.0
Projeto realizado na imersão Full Stack Full Cycle 

## Apache-kafka

1 - docker compose up -d
  1.1 docker exec -it apache-kafka-kafka-1 bash  
  1.2 kafka-console-consumer --bootstrap-server=localhost:9092 --topic=route.new-direction
    1.2.1 {"clientId":"1","id":"1"} 
  1.3 kafka-console-producer --bootstrap-server=localhost:9094 --topic=route.new-direction