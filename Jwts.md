## For Hasura

```json
{ "key": "secret-string", "type": "HS256" }
```

## For the Token

```json
{
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["user"],
    "x-hasura-default-role": "user",
    "x-hasura-user-id": "<UUID>"
  }
}
```

## Generate secret

```bash
openssl rand -base64 64
```

## Generate Token

https://hasura.retool.com/apps/London%20Workshop/HotJWT
