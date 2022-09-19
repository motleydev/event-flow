## For Hasura

```json
{ "key": "secret-string", "type": "HS256" }
```

## For the Token

```json
{
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["user", "anonymous"],
    "x-hasura-default-role": "user",
    "x-hasura-user-id": "<UUID>",
    "x-hasura-secret-id": "<STRING>"
  }
}
```

## Generate secret

```bash
openssl rand -base64 64
```
