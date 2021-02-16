const Discord = require("discord.js"); 

const Client = new Discord.Client;

const prefix = "l!";

Client.on("ready", () => {
    console.log("Bot opérationel");

    Client.guilds.cache.find(guild => guild.id === "794330858029842443").channels.cache.find(channel => channel.id === "807247040596934707").messages.fetch("808024272102621184").then(message => {
        console.log("Message ajouté à la mémoires : " + message.content );
    }).catch(err => {
        console.log("Impossibled'ajouter le message en mémoire : " + err);
    });
});
   

Client.on("guildMemberAdd", member => {
    console.log("Un nouveau membre est arrivé");
    member.guild.channels.cache.find(channel => channel.id === "794988688068575243").send(member.displayName + " est arrivé bienvenue a toi !\nNous sommes désormais **" + member.guild.memberCount + "** sur le serveur !https://media.discordapp.net/attachments/805390730700521492/807614898251104266/LosAngeles.jpg");
    member.roles.add("794330858029842443").then(mbr => {
        console.log("Rôle attribué avec succès pour " + mbr.displayName)
    }).catch(() =>{
        console.log("le rôle n'a pas pu être attribuer")
    });
});

Client.on("guildMemberRemove", member => {
    console.log("Un membre est partie");
    member.guild.channels.cache.find(channel => channel.id === "794988960719699978").send(member.displayName + " est partie bonne continuation :sob::sob: !https://media.discordapp.net/attachments/805390730700521492/807614898251104266/LosAngeles.jpg");
});

Client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return;
    
    console.log("Reaction ajouté avec succès par " + user.username + "\nNom de l'émoji " + reaction.emoji.name + " c'est la " + reaction.count + "e reaction");

    if(reaction.message.id === "808048951793680434"){
        if(reaction.emoji.name === "flux"){
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            member.roles.add("794638525151576066").then(mbr => {
                console.log("Roles attribuer avec succès pour " + mbr.displayName);
            }).catch(err => {
                console.log("Le rôle n'a pas pu être attribué : " + err);
            });
        }
    }

   /*reaction.users.remove(user.id).then(react => {
        console.log("Reaction" + react.emoji.name + " retiré par le bot")
    }).catch(err => {
        console.log("Impossible de retiré la reaction : " + err);
    });*/

    reaction.remove().then(react => {
        console.log("Reaction" + react.emoji.name + " retiré par le bot");
    }).catch(err => {
        console.log("Impossible de retiré la reaction : " + err);
    });
});

Client.on("messageReactionRemove", (reaction, user) => {
    if(user.bot) return;

    console.log("Reaction retiré")
});


Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    
    message.react("💬");

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first()
        
            if(mention == undefined){
                message.reply("Mention Echoué !");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été bani avec succès");
                }
                else {
                    message.reply("Impossible de banir ce membre !");
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Mention Echoué !");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick avec succès !");
                }
                else {
                    message.reply("Impossible de kick ce membre !");
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Mention Echoué !");
            }
            else {
                mention.roles.add("807882856889974804");
                message.channel.send(mention.displayName + " mute avec succès !");
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Mention Echoué !");
            }
            else {
                mention.roles.remove("807882856889974804");
                message.channel.send(mention.displayName + " unmute avec succès !");
            }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Mention Echoué");
            }
            else {
                let args = message.content.split(" ");

                mention .roles.add("807882856889974804");
                setTimeout(function() {
                    mention.roles.remove("807882856889974804");
                    message.channel.send("<@" + mention.id + "> tu peux désormais parler de nouveau !");
                }, args[2] * 1000);
            }
        }
    }

    

    //l!ping
    if(message.content == prefix + "ping"){
        message.reply("pong")
        message.channel.send("pong");
    }

    if(message.content == prefix + "stats"){
        message.channel.send("**" + message.author.username + "** qui a pour identifient : __" + message.author.id + "__ a posté un message");
    }
});

Client.login("NzM5ODE0OTI1MzgzNDk5Nzc4.Xyf8Vw.ifgLK2fEIvSTUn-MzGv0vGD6RpY");
