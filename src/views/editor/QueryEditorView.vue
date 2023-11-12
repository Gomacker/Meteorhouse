<script setup lang="ts">
import { ref } from 'vue'
import AScroll from '@/components/utils/AScroll.vue'

const testData = ref({})
testData.value = {
  query_map: [
    {
      type: 'schedule',
      regex: '日程|千里眼'
    },
    {
      type: 'text',
      regex: '帮助',
      content:
        '指令：\n[qr、/、查询 + 内容] 查询资源/攻略索引\n[pqr、#、查盘 + 内容] 从图书馆查找盘子记录\n额外信息请见“开发相关”'
    },
    {
      type: 'text',
      regex: '开发相关',
      content:
        'doc::开发相关 20231021_1437edited\n当前进度：\n√ 芙芙    × 菲比\n× 格雷    √ 小鹿\n× 泽诺\n消息已同步\n--------------------\n如果与现有bot冲突/需要静默 请发送@ + 静音\n--------------------\ngithub：https://github.com/Gomacker/Anisebot\n流星屋图书馆：https://meteorhouse.wiki/\n主群：\n515793406\n920592857'
    },
    {
      type: 'server_table',
      regex: '活|活动',
      table_id: 'event_re0'
    },
    {
      type: 'text',
      regex: '^(礼包|兑换)[码马🐎🐴]$',
      content:
        '目前可用的兑换码：\n满月之夜\n金秋十月\niOS支持接口：https://actscp.leiting.com/wf/act/202307/redemption/'
    },
    {
      type: 'text',
      regex: '流星屋|图书馆|meteorhouse',
      content: 'https://meteorhouse.wiki/'
    },
    {
      type: 'text',
      regex: '^(wf)?wiki$',
      content: 'https://wfwiki.com/index'
    },
    {
      type: 'text',
      regex: '^b[^.]*wiki$',
      content: 'https://wiki.biligame.com/worldflipper/%E9%A6%96%E9%A1%B5'
    },
    {
      type: 'text',
      regex: '^(cc站|gamercc|磁场)$',
      content: 'https://www.gamer.cn/sjtswy'
    },
    {
      type: 'text',
      regex: '^日历$',
      content: 'https://wf-calendar.miaowm5.com/'
    },
    {
      type: 'text',
      regex: '^eliya$',
      content: 'https://eliya-bot.herokuapp.com/'
    },
    {
      type: 'text',
      regex: '^(n[gb]a|178)$',
      content: 'https://nga.178.com/thread.php?fid=693'
    },
    {
      type: 'wfo',
      regex: '',
      strict: true
    },
    {
      type: 'server_table',
      regex: 're0|Re0',
      table_id: 'event_re0'
    },
    {
      type: 'server_table',
      regex: '圣诞|雪人|火人|圣夜|圣夜的淘气鬼',
      table_id: 'event_xm'
    },
    {
      type: 'server_table',
      regex: '(万圣|镇魂歌|南瓜)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      table_id: 'hlw'
    },
    {
      type: 'server_table',
      regex: '(凉宫|联动)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      table_id: 'event_suzumiya'
    },
    {
      type: 'server_table',
      regex: '(百兽|王冠)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      table_id: 'beast_king'
    },
    {
      type: 'server_table',
      regex: '(风将|獠牙骑士|超猪|风猪)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      table_id: 'boss_2_4'
    },
    {
      type: 'server_table',
      regex: '(背鳍三兄弟|鲨鱼|超鲨)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      table_id: 'shark'
    },
    {
      type: 'server_table',
      regex: '妖怪图鉴|妖怪',
      table_id: 'yokai'
    },
    {
      type: 'server_table',
      regex: '热情|情热|夏活|爱河|漂流',
      table_id: 'smr21'
    },
    {
      type: 'server_image',
      regex: '大海|大海的遗产|遗产|大海爆金币|大姨的海产',
      url: '/static/worldflipper/query/大海.png'
    },
    {
      type: 'server_table',
      regex: 'gbf|碧蓝|blhx|cross|联动|风神|雷神',
      table_id: 'event_gbf'
    },
    {
      type: 'server_table',
      regex: '^(hero|全自动警卫|mk2|[总统]领|[总统]领ai)(一图流)?$',
      table_id: 'event_hero'
    },
    {
      type: 'server_table',
      regex: '赤女|赤之女王|赤汁女王',
      table_id: 'multi_pick_31_1'
    },
    {
      type: 'server_table',
      regex: '超青|青女|青之女王|青汁女王',
      table_id: 'nw_1'
    },
    {
      type: 'server_table',
      regex: '共誓|黎明|共誓黎明',
      table_id: 'event_gslm'
    },
    {
      type: 'server_table',
      regex: '佐贺',
      table_id: 'event_zombie'
    },
    {
      type: 'server_table',
      regex: '(水精|水精灵兽|水牛)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      table_id: 'spirit_beast_water'
    },
    {
      type: 'server_table',
      regex: '(雷精|雷精灵兽|雷龟|龟)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      table_id: 'spirit_beast_thunder'
    },
    {
      type: 'server_table',
      regex: '(火荒|火废|灼炎|炎荒|炎废)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      table_id: 'discarded_dragon_0'
    },
    {
      type: 'server_image',
      regex: '(水荒|水废|水蚀)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      url: '/static/worldflipper/query/水荒龙.png'
    },
    {
      type: 'server_image',
      regex: '(雷荒|雷废|黑雷)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      url: '/static/worldflipper/query/雷荒龙.png'
    },
    {
      type: 'server_table',
      regex: '(风荒|风废|歼风)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      table_id: 'discarded_dragon_3'
    },
    {
      type: 'server_image',
      regex: '(光荒|光废|光芒|光龙)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      url: '/static/worldflipper/query/光荒龙.png'
    },
    {
      type: 'server_table',
      regex: '(暗荒|暗废|凶暗)[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?',
      table_id: 'discarded_dragon_5'
    },
    {
      type: 'server_table',
      regex: '闪火',
      table_id: 'tab_0'
    },
    {
      type: 'server_table',
      regex: '奔雷',
      table_id: 'tab_2'
    },
    {
      type: 'server_image',
      regex: '旋风',
      url: '/static/worldflipper/query/旋风.png'
    },
    {
      type: 'server_image',
      regex: '溢光',
      url: '/static/worldflipper/query/溢光.png'
    },
    {
      type: 'server_image',
      regex: '(^abs$)|(^阿比斯$)|临境域|深渊兽|深渊之兽',
      url: '/static/worldflipper/query/abs.png'
    },
    {
      type: 'server_image',
      regex: '新手|萌新|教程',
      url: '/static/worldflipper/query/新手.png'
    },
    {
      type: 'server_table',
      regex: '深层',
      table_id: 'newbie_deep'
    },
    {
      type: 'server_image',
      regex: '(([二2]周年(限定)?)|限定)超得',
      url: '/static/worldflipper/query/二周年超得.png'
    },
    {
      type: 'server_image',
      regex: 'abc(超得)?',
      url: '/static/worldflipper/query/abc超得.png'
    },
    {
      type: 'server_image',
      regex: '(百兽)?(同期)?超得',
      url: '/static/worldflipper/query/超得1.png'
    },
    {
      type: 'server_image',
      regex: '月刊',
      url: '/static/worldflipper/query/半月刊.png'
    },
    {
      type: 'server_image',
      regex: '材料|素材',
      url: '/static/worldflipper/query/材料.png'
    },
    {
      type: 'server_table',
      regex: '[二六26][板版]',
      table_id: 'mb2'
    },
    {
      type: 'server_image',
      regex: '风属性环境笔记|(浮游|回转|四郎|技伤|挨打|连击)风|风(PF|技伤|直击)|风队',
      url: '/static/worldflipper/query/风队.png'
    },
    {
      type: 'server_table',
      regex: '卡池',
      table_id: 'gacha_pool'
    },
    {
      type: 'server_image',
      regex: '工具',
      url: '/static/worldflipper/query/工具.png'
    },
    {
      type: 'server_image',
      regex: 'buff',
      url: '/static/worldflipper/query/buff.png'
    },
    {
      type: 'server_image',
      regex: '(火(属性|角色)?上修)|上修火',
      url: '/static/worldflipper/query/上修火.png'
    },
    {
      type: 'server_image',
      regex: '(水(属性|角色)?上修)|上修水',
      url: '/static/worldflipper/query/上修水.png'
    },
    {
      type: 'server_image',
      regex: '(雷(属性|角色)?上修)|上修雷',
      url: '/static/worldflipper/query/上修雷.png'
    },
    {
      type: 'server_image',
      regex: '(风(属性|角色)?上修)|上修风',
      url: '/static/worldflipper/query/上修风.png'
    },
    {
      type: 'server_image',
      regex: '(光(属性|角色)?上修)|上修光',
      url: '/static/worldflipper/query/上修光.png'
    },
    {
      type: 'server_image',
      regex: '(暗(属性|角色)?上修)|上修暗',
      url: '/static/worldflipper/query/上修暗.png'
    },
    {
      type: 'server_image',
      regex: '上修',
      url: '/static/worldflipper/query/上修菜单.png'
    },
    {
      type: 'server_image',
      regex: '材料|消耗',
      url: '/static/worldflipper/query/材料.png'
    },
    {
      type: 'server_image',
      regex: 'ss',
      url: '/static/worldflipper/query/ss.png'
    },
    {
      type: 'server_image',
      regex: '御三家',
      url: '/static/worldflipper/query/御三家.png'
    },
    {
      type: 'server_image',
      regex: '114514',
      url: '/static/worldflipper/query/114514.png'
    },
    {
      type: 'server_table',
      regex: '超(级)?火[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?|超级魔像',
      table_id: 'boss_1_0'
    },
    {
      type: 'server_table',
      regex: '超(级)?水[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?|(超(级)?)?(螃)?蟹',
      table_id: 'boss_1_1'
    },
    {
      type: 'server_table',
      regex: '超(级)?雷[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?|(超(级)?)?(跳跳|白)?虎',
      table_id: 'boss_1_2'
    },
    {
      type: 'server_table',
      regex: '超(级)?风[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?|超(级)?不死王',
      table_id: 'boss_1_3'
    },
    {
      type: 'server_image',
      regex: '超(级)?光[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?|(超(级)?)?管理者',
      url: '/static/worldflipper/query/超光.png'
    },
    {
      type: 'server_table',
      regex: '超(级)?暗[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?|(超(级)?)?恶魔',
      table_id: 'boss_1_5'
    },
    {
      type: 'server_table',
      regex: '超蛇[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?|(超(级)?)?大蛇',
      table_id: 'boss_1_6'
    },
    {
      type: 'server_table',
      regex: '超(级)?熊[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?|((超(级)?)?((火?熊)|猩红巨熊))',
      table_id: 'boss_2_5'
    },
    {
      type: 'server_table',
      regex: '超机[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?|(超(级)?)?(机器人|5200|5200li|sec)',
      table_id: 'boss_2_0'
    },
    {
      type: 'server_table',
      regex: '超狐[^剑刀枪棍斧拳爪弓弩杖书盾镯铳]?|(超(级)?)?(妖狐|狐妖|暗狐)',
      table_id: 'boss_2_1'
    },
    {
      type: 'server_table',
      regex: '^地狱火',
      table_id: 'hell_0'
    },
    {
      type: 'server_image',
      regex: '^地狱火',
      url: '/static/worldflipper/query/地狱火.png'
    },
    {
      type: 'server_image',
      regex: '^地狱水',
      url: '/static/worldflipper/query/地狱水.png'
    },
    {
      type: 'server_image',
      regex: '^地狱雷',
      url: '/static/worldflipper/query/地狱雷.png'
    },
    {
      type: 'server_image',
      regex: '^地狱风',
      url: '/static/worldflipper/query/地狱风.png'
    },
    {
      type: 'server_table',
      regex: '^地狱光',
      table_id: 'hell_4'
    },
    {
      type: 'server_table',
      regex: '^地狱暗',
      table_id: 'hell_5'
    },
    {
      type: 'server_image',
      regex: '^地狱暗',
      url: '/static/worldflipper/query/地狱暗.png'
    },
    {
      type: 'server_image',
      regex: '地狱',
      url: '/static/worldflipper/query/地狱菜单.png'
    },
    {
      type: 'server_image',
      regex: '火球鼠',
      url: '/static/worldflipper/query/火球鼠.png'
    },
    {
      type: 'party_refer',
      regex: ''
    },
    {
      type: 'pps',
      regex: ''
    },
    {
      type: 'wfo',
      regex: '',
      strict: false
    }
  ]
}

enum QueryTypes {
  schedule = 'schedule',
  text = 'text',
  server_table = 'server_table',
  server_image = 'server_image',
  pps = 'pps',
  wfo = 'wfo'
}
const availableTypes = [...Object.keys(QueryTypes)]
</script>

<template>
  <AScroll style="height: 100%">
    <template v-for="q in testData.query_map" :key="q">
      <v-card style="margin: 4px">
        <v-card-item>
          <v-select
            hide-details
            label='类型'
            density="compact"
            :items="availableTypes"
            v-model="q.type"
            :item-value="(v) => v"
          ></v-select>
        </v-card-item>
        <hr style="margin: 0 8px" />
        <v-card-item>
          <template v-if="q.type === QueryTypes.schedule.toString()"> schedule </template>
        </v-card-item>
        <span style="color: lightgrey">{{ q }}</span>
      </v-card>
    </template>
  </AScroll>
</template>

<style scoped></style>
