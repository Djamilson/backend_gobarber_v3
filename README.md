# Recuperação de senha
**RF**
- O usuário deve poder recuperar sua senha informando seu email;
- O usuário deve poder receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**
- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link envaido por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**
O usuário deve poder atualizar seu nome, email e senha;
**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuario precisa confirmar sua nova senha.

# Painel do prestador
**RF**
- O usuário dever listar seus agendamentos de um dia específico;
- O prestador deve receber uma notficação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação dever ter um status de lida ou não-lida pra que o prestador possa controlar;


# Agendamento de serviços

**RF**
- O usuário deve poder listar  todos prestadores de serviço cadastrados;
- O usuario deve pode lista os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponiveis em um dia específico de um prestador;
- O usuario deve poder ralizar um novo agendamento com um prestador;

**RNF**
- A listagem de prestadores deve ser armazenada em cache;

**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos deve estar disponíveis entre 08h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviçoes consigo mesmo;
- O usuário não pode agendar um horário já ocupado;
