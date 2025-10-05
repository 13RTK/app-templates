curl http://localhost:8080/todos -X POST \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIn0.H4Xc1ERkMvbdVw3MYU72GE0uxj-o4HjmfGaxQ2fAVPg"   \
     -d '{"title": "do bad thing", "description": "desc"}'