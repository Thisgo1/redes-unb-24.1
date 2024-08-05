uma simples aplicação web capaz de executar tais funções:

1 - Cliente deve poder recuperar a lista de 
áudios no servidor.
2 - Cliente deve poder clicar para ouvir 
um áudio hospedado no servidor.
3 - Se o cliente tentar tocar a música e ela 
não estiver em cache local, buscar no 
servidor.
4 - O servidor deve transmitir o áudio em 
blocos de 30 segundos.
5 - O cliente deve poder pausar o áudio, o 
que deve interromper a bufferização.
6 - Se o cliente retomar a execução do 
ponto parado ou reiniciar o áudio, o 
buffer local deve ser consumido
7 - Diferentes clientes devem ser capazes 
de se descobrir em uma rede local
8 - Clientes devem ser capazes de ouvir 
um áudio em um cliente remoto
