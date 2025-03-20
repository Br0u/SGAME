// 游戏状态
const gameState = {
  currentScene: "start",
  emotionLevel: 50,
  inventory: [],
  flags: {},
  history: [],
};

// 角色情绪状态描述
const emotionStates = [
  { min: 0, max: 20, name: "极度抑郁", mood: "完全崩溃，生无可恋" },
  { min: 21, max: 40, name: "低落", mood: "情绪低落，有点emo" },
  { min: 41, max: 60, name: "平静", mood: "情绪稳定，一切正常" },
  { min: 61, max: 80, name: "开心", mood: "心情不错，略带兴奋" },
  { min: 81, max: 100, name: "狂喜", mood: "兴高采烈，无比激动" },
];

// 游戏场景
const scenes = {
  start: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "你好！我是槑，人称<圭尔夫屁王>！准备好体验一段奇妙的人生旅程了吗？",
    choices: [
      { text: "开始冒险", nextScene: "campus" },
      { text: "了解更多关于我", nextScene: "about" },
    ],
  },
  about: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "我是圭尔夫大学的传奇人物！没人知道我从哪来，但每个人都知道我的存在。我喜欢用我独特的方式给人们带来欢乐和人生启示。想知道更多吗？",
    choices: [
      { text: "你为什么被称为屁王？", nextScene: "about_nickname" },
      { text: "你平时都做什么？", nextScene: "about_activities" },
      { text: "我想开始冒险了", nextScene: "campus" },
    ],
  },
  about_nickname: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "哈哈，这个称号来源于我的特殊才能！我可以在任何场合放出最适合气氛的屁。有时候是为了缓解紧张，有时候是为了表达不满，有时候纯粹是为了好玩！这是一门艺术，我的朋友！",
    choices: [
      {
        text: "这...真是特别的才能",
        nextScene: "about_talent",
        emotionChange: 5,
      },
      { text: "这太恶心了", nextScene: "about_disgust", emotionChange: -10 },
      { text: "我想开始冒险了", nextScene: "campus" },
    ],
  },
  about_talent: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "谢谢你的理解！很少有人能欣赏这门艺术。你知道吗？人生就像放屁，有时候需要憋着，有时候需要释放。掌握这个平衡，你就掌握了生活的真谛！",
    choices: [
      {
        text: "这倒是个有趣的人生哲学",
        nextScene: "about_philosophy",
        emotionChange: 5,
      },
      { text: "我想开始冒险了", nextScene: "campus" },
    ],
  },
  about_disgust: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "唉，又一个不懂欣赏的人。我的才能被误解已经不是第一次了...(伤心地叹气)。不过没关系，每个人都有自己的看法。",
    choices: [
      {
        text: "抱歉，我不该那么说",
        nextScene: "about_apology",
        emotionChange: 10,
      },
      { text: "我想开始冒险了", nextScene: "campus" },
    ],
  },
  about_apology: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "没关系！我很高兴你能理解。人生中最重要的是能够接受自己的特点，无论别人怎么看。这也是我想传达的人生道理之一！",
    choices: [{ text: "我想开始冒险了", nextScene: "campus" }],
  },
  about_philosophy: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "没错！生活中的每一个决定都像是在决定是否放屁：时机、场合、方式都很重要。有时候需要勇气，有时候需要克制。这就是我的'屁道'哲学！",
    choices: [
      {
        text: "这可能是我听过最奇怪但有道理的哲学了",
        nextScene: "about_impressed",
        emotionChange: 5,
      },
      { text: "我想开始冒险了", nextScene: "campus" },
    ],
  },
  about_impressed: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "太棒了！你是第一个真正理解我哲学的人！我感觉我们会成为好朋友的。准备好一起探索更多人生道理了吗？",
    choices: [
      { text: "当然，我很期待", nextScene: "campus", emotionChange: 5 },
    ],
  },
  about_activities: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "我喜欢在校园里游荡，观察人们的生活，在关键时刻给予他们一些'特别'的启示。有时候是一句话，有时候是一个行动，有时候...嗯...是一个气味信号。我也很喜欢吃鸡公煲，那是我的最爱！",
    choices: [
      {
        text: "听起来你的生活很有趣",
        nextScene: "about_interesting",
        emotionChange: 5,
      },
      { text: "我想开始冒险了", nextScene: "campus" },
    ],
  },
  about_interesting: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "生活本来就应该充满乐趣！太多人被日常琐事困住，忘记了享受当下的快乐。这也是我想传达的：无论多么困难的时刻，都要记得找到属于自己的快乐！",
    choices: [
      { text: "这是个很好的人生态度", nextScene: "campus", emotionChange: 5 },
    ],
  },
  campus: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "欢迎来到圭尔夫大学校园！这里是我的地盘。今天是个阳光明媚的日子，校园里人来人往。你想去哪里探索呢？",
    choices: [
      { text: "去图书馆", nextScene: "library" },
      { text: "去食堂", nextScene: "cafeteria" },
      { text: "去操场", nextScene: "playground" },
    ],
  },
  library: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "啊，图书馆，知识的殿堂！也是我最喜欢恶作剧的地方之一。看那边，有个学生正在为考试焦虑地复习。要不要去'帮助'他一下？",
    choices: [
      { text: "去鼓励那个学生", nextScene: "library_encourage" },
      {
        text: "用你的'特殊才能'打破沉闷",
        nextScene: "library_prank",
        emotionChange: 10,
      },
      {
        text: "还是不要打扰别人学习了",
        nextScene: "library_leave",
        emotionChange: -5,
      },
    ],
  },
  library_encourage: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "你走过去，轻声对那个学生说了几句鼓励的话。我在旁边看着，对你竖起了大拇指。那个学生感激地笑了笑，似乎压力减轻了不少。",
    choices: [
      { text: "这感觉真好", nextScene: "library_good_deed", emotionChange: 5 },
      { text: "我们去别的地方看看吧", nextScene: "campus" },
    ],
  },
  library_good_deed: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "看到了吗？有时候最简单的善举能带来最大的改变。人生中，我们常常忽略了这些小小的善意之举。那个学生可能会记住今天的鼓励，并在未来传递给其他人。这就是善的循环！",
    choices: [
      {
        text: "你说得对，小善举也很重要",
        nextScene: "campus",
        emotionChange: 5,
      },
    ],
  },
  library_prank: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "哈哈！你怂恿我使用我的'特殊才能'！我悄悄走到书架旁，释放了一个无声但威力巨大的'气息'。几秒钟后，周围的学生纷纷皱眉，四处张望。那个焦虑的学生忍不住笑了出来，图书馆的沉闷气氛一扫而空！",
    choices: [
      { text: "这太搞笑了！", nextScene: "library_laugh", emotionChange: 10 },
      {
        text: "我有点后悔怂恿你了",
        nextScene: "library_regret",
        emotionChange: -5,
      },
    ],
  },
  library_laugh: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "看吧！有时候打破常规才能找到快乐。那个学生刚才还愁眉苦脸，现在已经放松多了。学习不必总是严肃的，适当的放松和笑声能让大脑更高效地工作！这也是一种人生智慧！",
    choices: [
      { text: "确实，平衡很重要", nextScene: "campus", emotionChange: 5 },
    ],
  },
  library_regret: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "唉，我看出你不太满意这个结果。但你知道吗？有时候我们需要打破常规，才能看到不同的可能性。那个学生现在笑了，压力减轻了。不过我理解你的顾虑，下次我会更考虑场合的。",
    choices: [
      { text: "我明白你的用意了", nextScene: "campus", emotionChange: 5 },
      { text: "我们去别的地方吧", nextScene: "campus" },
    ],
  },
  library_leave: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "啊，你选择不打扰他。我有点失望，本来想展示我的才能的。不过你说得对，尊重他人的学习空间也很重要。我们去别的地方看看吧。",
    choices: [
      { text: "去食堂看看", nextScene: "cafeteria" },
      { text: "去操场转转", nextScene: "playground" },
    ],
  },
  cafeteria: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "食堂！我最喜欢的地方之一！看，今天有鸡公煲！我的最爱！但是队伍好长啊...嗯，你觉得我们应该怎么办？",
    choices: [
      { text: "耐心排队", nextScene: "cafeteria_queue" },
      {
        text: "用你的'特殊才能'清空队伍",
        nextScene: "cafeteria_clear",
        emotionChange: 15,
      },
      {
        text: "去吃别的东西",
        nextScene: "cafeteria_other",
        emotionChange: -10,
      },
    ],
  },
  cafeteria_queue: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "我们耐心地排在队伍中。虽然我有点坐立不安，但你的冷静影响了我。等待的过程中，我们聊了很多有趣的话题，时间过得很快。",
    choices: [
      {
        text: "耐心等待总会有回报",
        nextScene: "cafeteria_patience",
        emotionChange: 5,
      },
      {
        text: "和你聊天很有趣",
        nextScene: "cafeteria_chat",
        emotionChange: 10,
      },
    ],
  },
  cafeteria_patience: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "没错！人生中很多时候都需要耐心。快餐文化让我们失去了等待的能力，但正是在等待中，我们才能体会到最终获得的喜悦。啊，终于轮到我们了！这鸡公煲真香啊！",
    choices: [
      { text: "确实很香！", nextScene: "cafeteria_enjoy", emotionChange: 5 },
    ],
  },
  cafeteria_chat: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "我也觉得和你聊天很开心！有时候排队这样的'无聊'时刻，反而能创造出最真诚的交流。生活中的美好，往往藏在这些看似平凡的时刻里。啊，我们终于可以吃鸡公煲了！",
    choices: [
      { text: "开动吧！", nextScene: "cafeteria_enjoy", emotionChange: 5 },
    ],
  },
  cafeteria_enjoy: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "这鸡公煲太美味了！你知道吗？美食是生活中最直接的快乐来源之一。无论多么困难的日子，一顿美餐都能让人重新振作起来。这也是我的人生哲学之一！",
    choices: [
      { text: "美食确实有治愈的力量", nextScene: "campus", emotionChange: 5 },
      { text: "吃完去别的地方看看", nextScene: "campus" },
    ],
  },
  cafeteria_clear: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "你真是个捣蛋鬼！我走到队伍中间，深吸一口气，然后释放了我的'终极武器'。效果立竿见影！人群四散，有人捂鼻子，有人假装接电话离开...不到一分钟，我们就站在了队伍的最前面！",
    choices: [
      {
        text: "这招太厉害了！",
        nextScene: "cafeteria_impressed",
        emotionChange: 10,
      },
      {
        text: "我们这样做不太好吧",
        nextScene: "cafeteria_guilt",
        emotionChange: -5,
      },
    ],
  },
  cafeteria_impressed: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "哈哈，是吧！有时候人生需要一点'非常规'的解决方案！不过别担心，我不会经常这么做的。只是偶尔，当鸡公煲在召唤我的时候...嘿，我们拿到食物了！这鸡公煲真是太香了！",
    choices: [
      { text: "确实很香！", nextScene: "cafeteria_enjoy", emotionChange: 5 },
    ],
  },
  cafeteria_guilt: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "唉，你说得对。我有时候太冲动了。看看那些被我们'赶走'的人，他们可能和我们一样期待着美食。我的'特殊才能'应该用在更恰当的场合。我们还是回去排队吧。",
    choices: [
      {
        text: "这才是正确的决定",
        nextScene: "cafeteria_queue",
        emotionChange: 10,
      },
      { text: "算了，我们去吃别的吧", nextScene: "cafeteria_other" },
    ],
  },
  cafeteria_other: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "什么？不吃鸡公煲？你怎么能这样！(一脸悲伤)鸡公煲是世界上最美妙的食物！唉，好吧，如果你坚持的话...我们可以去吃沙拉或者三明治...(明显不情愿)",
    choices: [
      {
        text: "好吧，为了你，我们还是吃鸡公煲吧",
        nextScene: "cafeteria_queue",
        emotionChange: 15,
      },
      {
        text: "健康饮食也很重要",
        nextScene: "cafeteria_healthy",
        emotionChange: -5,
      },
    ],
  },
  cafeteria_healthy: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "健康饮食...是的，你说得对。(勉强同意)我知道我应该多吃蔬菜，少吃重口味的食物。但是...但是...鸡公煲啊！(眼中含泪)算了，为了健康，偶尔牺牲一下也是值得的。",
    choices: [
      {
        text: "下次我们再来吃鸡公煲",
        nextScene: "cafeteria_promise",
        emotionChange: 10,
      },
      { text: "我们去操场活动一下", nextScene: "playground" },
    ],
  },
  cafeteria_promise: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "真的吗？你保证？(眼睛突然亮了起来)那我就忍一次！你知道吗，这也是一种人生智慧：有时候短暂的放弃是为了更好的未来。就像我现在放弃鸡公煲，是为了下次能更好地享用它！",
    choices: [
      { text: "你总能从食物中悟出道理", nextScene: "campus", emotionChange: 5 },
      { text: "我们去操场活动一下", nextScene: "playground" },
    ],
  },
  playground: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "啊，操场！阳光、新鲜空气和运动！看那边有一群学生在踢足球，还有人在跑步。你想做什么？",
    choices: [
      { text: "加入足球比赛", nextScene: "playground_soccer" },
      { text: "去跑步", nextScene: "playground_run" },
      { text: "就在这里休息一会儿", nextScene: "playground_rest" },
    ],
  },
  playground_soccer: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "我们走向足球场，问是否可以加入。他们热情地欢迎了我们。比赛很激烈，我展示了我惊人的足球技巧...好吧，其实我踢得很糟糕，但我们玩得很开心！",
    choices: [
      {
        text: "输赢不重要，重要的是参与",
        nextScene: "playground_philosophy",
        emotionChange: 5,
      },
      {
        text: "你的足球技术真的需要提高",
        nextScene: "playground_criticism",
        emotionChange: -5,
      },
    ],
  },
  playground_philosophy: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "没错！生活就像这场足球赛，重要的不是结果，而是过程中的快乐和成长。我们可能踢得不好，但我们尝试了，我们笑了，我们交到了新朋友。这些才是真正重要的！",
    choices: [
      { text: "这是个很好的人生态度", nextScene: "campus", emotionChange: 5 },
    ],
  },
  playground_criticism: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "唉...(低头)我知道我踢得不好。其实我一直想提高，但总是找不到时间练习。你知道吗？有时候我们太容易批评别人的不足，而忽略了他们的努力和勇气。",
    choices: [
      {
        text: "抱歉，我不该那么说",
        nextScene: "playground_apology",
        emotionChange: 10,
      },
      { text: "我们去做点别的吧", nextScene: "campus" },
    ],
  },
  playground_apology: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "没关系！批评也是成长的一部分。重要的是我们能从中学习，而不是被打倒。这也是人生的一课：接受批评，但不要被它定义。继续前进，继续尝试新事物！",
    choices: [
      {
        text: "你说得对，我们继续探索吧",
        nextScene: "campus",
        emotionChange: 5,
      },
    ],
  },
  playground_run: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "我们决定去跑步。开始时感觉很好，但没跑多久，我就气喘吁吁了。(喘气)我...我需要...休息一下...(弯腰撑膝)你...你怎么...还能...继续跑...",
    choices: [
      {
        text: "坚持一下，跑步对身体好",
        nextScene: "playground_encourage_run",
        emotionChange: -5,
      },
      {
        text: "我们休息一下吧",
        nextScene: "playground_rest",
        emotionChange: 5,
      },
    ],
  },
  playground_encourage_run: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "我...我真的...不行了...(突然停下来，坐在地上)你知道吗？有时候我们需要承认自己的极限。不是每个人都适合做同样的事情，了解自己的身体和能力也是一种智慧。",
    choices: [
      {
        text: "你说得对，我们休息一下",
        nextScene: "playground_rest",
        emotionChange: 10,
      },
      { text: "好吧，我们去做点别的", nextScene: "campus" },
    ],
  },
  playground_rest: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "我们找了个树荫下的长椅坐下。微风拂面，阳光透过树叶洒下斑驳的光影。这一刻感觉如此宁静和美好。",
    choices: [
      {
        text: "这样放松的时刻真是难得",
        nextScene: "playground_relax",
        emotionChange: 5,
      },
      { text: "我们聊聊天吧", nextScene: "playground_chat" },
    ],
  },
  playground_relax: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "是啊，在这个忙碌的世界里，我们常常忘记停下来，享受当下的美好。有时候最简单的快乐就是坐在阳光下，什么都不做，什么都不想，只是存在。这也是一种人生智慧。",
    choices: [
      {
        text: "简单的快乐往往是最真实的",
        nextScene: "campus",
        emotionChange: 5,
      },
    ],
  },
  playground_chat: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "我们聊了很多话题：梦想、恐惧、希望、遗憾...在这短暂的交流中，我们似乎比许多长期认识的人还要了解彼此。有时候，与陌生人的深度交流能带来意想不到的启示。",
    choices: [
      { text: "谢谢你分享这些想法", nextScene: "ending", emotionChange: 10 },
    ],
  },
  ending: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "时间过得真快，太阳已经开始西沉了。我们的冒险之旅也该告一段落了。今天的经历让你有什么感悟吗？",
    choices: [
      { text: "我学会了更珍惜生活中的小确幸", nextScene: "ending_happiness" },
      { text: "我明白了有时需要打破常规", nextScene: "ending_rules" },
      { text: "我理解了接纳自己的重要性", nextScene: "ending_acceptance" },
    ],
  },
  ending_happiness: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "太棒了！生活中的小确幸往往被我们忽略，但正是这些小小的快乐时刻，构成了我们人生的美好回忆。无论是一顿美食，一次交谈，还是一个微笑，都值得我们珍惜。",
    choices: [{ text: "谢谢你的陪伴和启发", nextScene: "final" }],
  },
  ending_rules: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "没错！规则和常规有时候会限制我们的思维和可能性。适当地打破常规，用不同的方式思考问题，往往能带来意想不到的收获。当然，这需要智慧来判断何时该遵循，何时该打破。",
    choices: [{ text: "谢谢你的陪伴和启发", nextScene: "final" }],
  },
  ending_acceptance: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "这是最重要的人生课题之一！接纳自己的优点和缺点，接纳自己的特殊之处，才能真正活出自我。就像我接受了自己的'特殊才能'一样，每个人都有自己独特的地方，值得被珍视。",
    choices: [{ text: "谢谢你的陪伴和启发", nextScene: "final" }],
  },
  final: {
    image: "pic/WechatIMG184.jpg",
    dialogue:
      "不客气！希望我们的冒险给你带来了一些欢乐和思考。记住，无论生活多么复杂，有时候最简单的解决方法就是像放屁一样——该放就放，该憋就憋，但永远不要忘记笑对人生！再见，我的朋友！",
    choices: [{ text: "重新开始", nextScene: "start" }],
  },
};

// DOM元素
const sceneImage = document.getElementById("scene-image");
const characterMood = document.getElementById("character-mood");
const speakerName = document.getElementById("speaker-name");
const dialogueText = document.getElementById("dialogue-text");
const choicesContainer = document.getElementById("choices-container");
const emotionMeter = document.getElementById("emotion-meter");
const emotionFill = document.getElementById("emotion-fill");
const emotionStatus = document.getElementById("emotion-status");
const userInputContainer = document.getElementById("user-input-container");
const userInput = document.getElementById("user-input");
const submitInput = document.getElementById("submit-input");
const characterInfo = document.getElementById("character-info");
const showInfo = document.getElementById("show-info");
const closeInfo = document.getElementById("close-info");

// 初始化游戏
function initGame() {
  updateScene(gameState.currentScene);
  updateEmotionDisplay();

  // 事件监听器
  showInfo.addEventListener("click", () => {
    characterInfo.classList.remove("hidden");
  });

  closeInfo.addEventListener("click", () => {
    characterInfo.classList.add("hidden");
  });

  submitInput.addEventListener("click", handleUserInput);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
  });
}

// 更新场景
function updateScene(sceneId) {
  const scene = scenes[sceneId];
  if (!scene) {
    console.error(`Scene ${sceneId} not found!`);
    return;
  }

  gameState.currentScene = sceneId;

  // 更新对话
  dialogueText.textContent = scene.dialogue;

  // 更新角色心情
  updateCharacterMood();

  // 更新场景图片 - 根据情绪和场景类型选择合适的图片
  updateSceneImage(sceneId);

  // 更新选项
  updateChoices(scene.choices);

  // 记录历史
  gameState.history.push(sceneId);
}

// 添加新函数：根据情绪和场景类型更新图片
function updateSceneImage(sceneId) {
  // 默认图片
  let imagePath = "pic/WechatIMG184.jpg"; // 默认使用校园/日常场景

  // 根据情绪选择图片
  if (gameState.emotionLevel >= 61) {
    // 开心/兴奋
    imagePath = "pic/WechatIMG182.jpg";
  } else if (gameState.emotionLevel <= 40) {
    // 悲伤/低落
    imagePath = "pic/WechatIMG183.jpg";
  }

  // 特殊场景处理
  if (sceneId.includes("cafeteria")) {
    // 食堂场景
    imagePath = "pic/WechatIMG185.jpg";
  } else if (sceneId === "final" || sceneId.includes("ending")) {
    // 结束场景
    imagePath = "pic/WechatIMG5696.jpg";
  }

  // 更新图片
  sceneImage.src = imagePath;

  // 更新角色信息图片
  document.getElementById("character-pic").src = "pic/WechatIMG156.jpg";
}

// 更新选项
function updateChoices(choices) {
  // 清空现有选项
  choicesContainer.innerHTML = "";

  // 添加新选项
  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.textContent = choice.text;
    button.addEventListener("click", () => {
      handleChoice(choice);
    });
    choicesContainer.appendChild(button);
  });
}

// 处理选择
function handleChoice(choice) {
  // 更新情绪值
  if (choice.emotionChange) {
    updateEmotion(choice.emotionChange);
  }

  // 更新场景
  updateScene(choice.nextScene);
}

// 更新情绪值
function updateEmotion(change) {
  gameState.emotionLevel = Math.max(
    0,
    Math.min(100, gameState.emotionLevel + change)
  );
  updateEmotionDisplay();
}

// 更新情绪显示
function updateEmotionDisplay() {
  emotionMeter.textContent = gameState.emotionLevel;
  emotionFill.style.width = `${gameState.emotionLevel}%`;

  // 更新情绪状态文本
  const currentState = emotionStates.find(
    (state) =>
      gameState.emotionLevel >= state.min && gameState.emotionLevel <= state.max
  );

  if (currentState) {
    emotionStatus.textContent = currentState.name;
  }
}

// 更新角色心情
function updateCharacterMood() {
  const currentState = emotionStates.find(
    (state) =>
      gameState.emotionLevel >= state.min && gameState.emotionLevel <= state.max
  );

  if (currentState) {
    characterMood.textContent = currentState.mood;
  }
}

// 处理用户输入
function handleUserInput() {
  const text = userInput.value.trim();
  if (text) {
    // 处理用户输入的逻辑
    userInput.value = "";
  }
}

// 启动游戏
document.addEventListener("DOMContentLoaded", initGame);

// 如果需要添加更多功能，可以在这里添加
