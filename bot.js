const bot = require('easyvk');

// status = 1 не замужем 2 встречается 3 помолвен 4 замужем 5 все сложно 6 в активном поиске 7 влюблен 8 в гражданском браке
function BOT(userPhone, userPassword, age_to, age_from, status, group_id){
    bot({
        username : userPhone,
        password : userPassword,
        session_file: __dirname + '/.my-session'
    }).then(async vk => {
        
        var hi = ['Привет', 'Приветик', 'Салют', 'Шалом', 'Бонжур'];
        function myRandom(){
            return Math.floor(Math.random()*4)
        };
            let resultTeam  = await vk.call('users.search', {
                sex: 1,
                age_from: age_from,
                status: status,
                age_to: age_to,
                has_photo: 1,
                count: 1000,
                group_id: group_id,
                online: 1,
                hometown: 'Краснодар',
            });
            //console.log(resultTeam.vkr.items);
            var ids = [];
            var prom = new Promise((res, rej) =>{
                //console.log(resultTeam);
                resultTeam.vkr.items.forEach((item, i, arr) => {    
                    //console.log(item.id);
                    ids.push(item.id);    
                                
                    })
                    //console.log(ids);
                res(ids)

            }).then(async (ids) => {
                for(let i=ids.length-1; i >= 0; i--){
                        var now  = new Date().getTime();
                        //console.log(ids[i]);
                        //console.log('*************');
                        var a = ids[i];    
                        while(new Date().getTime() < now + 1000)
                        {
                            
                        }
                        //await function(a) {
                        let res = await vk.call('friends.areFriends', {
                            user_ids: a,
                            need_sign: 1, 
                        })
                        console.log(res);
                        if(res.vkr[0].friend_status == 0){
                            var promFriend = await vk.call('friends.add', {
                                user_id: a,
                                text: hi[myRandom()],
                            })
                            now = new Date().getTime();
                            while(new Date().getTime() < now + 10000)
                            {          
                        
                            }
                            
                            }
                
                        console.log(promFriend);
                        //.catch(error => {
                          //  console.log(error);
                        //})
                    //}
                }
                    });
            })
                           
        
    
            //console.log('*************');
        

};
//BOT(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.arg[6], process.argv[7]);
BOT('89883130005', 'zxcvbnm005', 42, 16, 1)



