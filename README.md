## Running for development
Install package
```
npm install
```

Copy config
```
cp .env.example .env
```

Start dev
```
npm start
```

## Config ENV

```
PORT=3000
MONGO_URL=mongodb://localhost:27017/debt-management
JWT_KEY=123456
```

## Example

### Using REST API

#### Authentication with Header

```
{
    ...
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTYzMDNjZDU0MzYwZDViOTdlM2M4NDYiLCJlbWFpbCI6ImR1eWsxNkBnbWFpbC5jb20iLCJpYXQiOjE1ODM1OTQ5MDMsImV4cCI6MTYxNjcxNDQ5ODAwNH0.vG6SU0lnPMwdnSCimOds3jwFmiia6k5Mup0j3uJM3uI"
    ...
}

```
| | | | | | |
|-|-|-|-|-|-|
|Method|URL|Query|Params|Body|Description|
|GET|/users| | | | Get all users|
|POST|/users| | |{email: "abc@gmail.com", password: "12345"} | Get all users|
|POST|/users/auth| | |{email: "abc@gmail.com", password: "12345"} | Get all users|
