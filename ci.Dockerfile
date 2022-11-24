FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-dotnet
WORKDIR /admin
RUN apt update && apt upgrade -y && apt install git
RUN git clone https://github.com/SavageLearning/Machete.git

WORKDIR /admin/Machete
RUN sed -i 's/localhost/sqlserver/g' Machete.Web/appsettings.json
RUN dotnet build --no-incremental
RUN dotnet publish -o output Machete.Web

FROM node:16-alpine as build-nodejs
WORKDIR /app
COPY ./ ./
RUN npm install
RUN npm run --silent build-prod

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-bionic
RUN mkdir -p /app/api/Content /app/api/Identity /app/api/dist
COPY --from=build-dotnet /admin/Machete/output/ /app/api
COPY --from=build-nodejs /app/dist /app/api/dist
WORKDIR /app/api
ENTRYPOINT ["dotnet","Machete.Web.dll"]
