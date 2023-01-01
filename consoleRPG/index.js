function createPlayer(name, hp, mp) {
  return {
    name: name,
    hp: hp,
    mp: mp,
    cure: function(hp) {
      if (this.hp > 0) {
        if ((this.mp - hp * 2) > 0) {
          this.mp -= hp * 2
          this.hp += hp
          return `${this.name} HP recovered!(HP=${this.hp}, MP=${this.mp})`
        } else {
          return `${this.name} have no MP to use cure.`
        }
      } else {
        //死了就別動了
        return `${this.name} is dead.`
      }
    },
    attack: function(enemy) {
      let attackPoint = Math.floor(Math.random() * 100)
      let msg = ''
      if (enemy.hp > attackPoint) {
        msg += `${this.name} hit ${enemy.name} . ${enemy.name} lose ${attackPoint} HP\n`
        enemy.hp -= attackPoint
        msg += `${enemy.name} is still alive. (HP=${enemy.hp})`
        return msg
      } else {
        msg = `${this.name} hit ${enemy.name}. ${enemy.name}(HP=${enemy.hp}) lose ${attackPoint} HP`
        enemy.hp -= enemy.hp
        return msg
      }
    }
  }
}
console.log('====== CREATE PLAYERS ======')
const magician = createPlayer('Magician', 30, 100)
const warrior = createPlayer('Warrior', 100, 30)
console.log(magician) // {name: "Magician", hp: 30, mp: 100}
console.log(warrior) // {name: "Warrior", hp: 100, mp: 30}
console.log('====== START FIGHT ======')
while (warrior.hp > 0 && magician.hp > 0) {
  // 戰士先攻
  console.log(warrior.attack(magician))
  console.log(magician.cure(20)) // 魔法師補血 20 點
  // 魔法師後攻
  if (magician.hp > 0) {
    console.log('Change sides \n')
    console.log(magician.attack(warrior))
    console.log(warrior.cure(10)) // 戰士補血 10 點
  }
  console.log('======')
}
console.log('GAME OVER.')