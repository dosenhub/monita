FROM rabbitmq:3-alpine

ADD https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.10.0/rabbitmq_delayed_message_exchange-3.10.0.ez $RABBITMQ_HOME/plugins/rabbitmq_delayed_message_exchange-3.10.0.ez

RUN chown rabbitmq:rabbitmq $RABBITMQ_HOME/plugins/rabbitmq_delayed_message_exchange-3.10.0.ez && \
  rabbitmq-plugins enable rabbitmq_delayed_message_exchange