---
layout: post
current: post
navigation: True
title: Como testar erros na função wp_mail() no WordPress usando hooks
date: 2018-03-14
category: WordPress
tags: 'wordpress, function, php'
description: "A dica hoje será bem rápida, iremos testar erros na função wp_mail() no WordPress usando hooks."
cover: assets/images/posts/wp_mail_faild-hook-function.png
class: post-template
subclass: 'post'
author: nandomoreira
---
Sabemos que da pra fazer bastante coisa no WordPress usando os famosos hooks e sabemos também que é impossível saber o retorno de um erro ao tentar enviar um email usando a função wp_mail(), pois ela só retorna valores booleanos (true ou false).

Sabendo disso o **WordPress** já nos deu uma [saída dessa cilada bino!](/assets/images/posts/its-a-trap-bino.jpg)

[Usando o hook `wp_mail_failed`](https://developer.wordpress.org/reference/hooks/wp_mail_failed/) podemos criar uma função para captar os erros gerados pela `wp_mail()`.

```php
<?php
add_action( 'wp_mail_failed', 'onMailError', 10, 1 );
function onMailError( $wp_error ) {
    echo '<pre>' . print_r($wp_error , true ) . '</pre>';
}
```

E usando o [Postman](https://www.getpostman.com/) eu simulei uma requisição para minha aplicação e BAZINGA!

<figure>
<img src="/assets/images/posts/wp_mail-error-postman.png" alt="hook wp_mail_failed no postman app"/>
<figcaption>hook wp_mail_failed no postman app</figcaption>
</figure>

É isso ai pessoal, se curtiu comenta ai.

`exit();`
