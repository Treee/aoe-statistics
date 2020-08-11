FROM mongo

ARG init_db_root_username
ENV MONGO_INITDB_ROOT_USERNAME ${init_db_root_username}

ARG init_db_root_password
ENV MONGO_INITDB_ROOT_PASSWORD ${init_db_root_password}

CMD ["mongod --auth"]
