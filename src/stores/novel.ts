import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// 小说句子列表（从 epub 提取的短句，2-20字）
const NOVEL_SENTENCES: string[] = [
  '「对方到底是谁',
  '请你看着我的眼睛说啊',
  '女人完全不行—— 同样身为男人才好呢',
  '「达斯特先生…… 欢迎来到死后的世界',
  '太狡猾了',
  '……这下完了',
  '这下真的完蛋了',
  '难得我都准备得这么周全了',
  '「大叔，这里是哪里',
  '「不好意思，我也不太清楚',
  '还有别叫我大叔',
  '「什么嘛，原来你也不知道啊',
  '「你是不是欠揍',
  '糟糕，我是不是说得太过头了',
  '这种时候应该先把手上的东西丢掉才对',
  '在开始新的人生之前',
  '先把现在的问题解决再说',
  '话说回来，我只不过是被马车给撞飞而已',
  '为什么会在这种莫名其妙的地方',
  '总不能坐在原地什么都不做吧',
  '待在这里也不是办法',
  '「我叫佐藤和真，今年16岁',
  '是个家里蹲',
  '「而且到现在还是处男』',
  '「……我叫阿克娅',
  '……真是个欠揍的名字吧',
  '身为女神却只能做到这种事',
  '……好了，先不管那个没用的女神了',
  '反正我本来就没抱太大的期待',
  '还是先搞清楚目前的情况再说吧',
  '这根本就是个废材女神嘛',
  '「喂，我才不是废材',
  '「你明明就是废材』',
  '别把我说得像是会给别人添麻烦的废材姐姐一样',
  '……冷静一点',
  '现在不是跟她吵架的时候',
  '……这家伙真的是女神吗',
  '……我还是先确认一下周围的情况好了',
  '「喂——有人吗——',
  '这种状况根本乱来一通嘛',
  '话说回来，这附近的风景还不错',
  '——先这样决定了',
  '我对这个选择一点都不后悔',
  '但是，这种事怎么想都不对吧',
  '这个女神明明就是个废材',
  '为什么会是由她来替我送行',
  '——反正我就是个家里蹲处男啦',
  '有什么意见吗',
  '「没——有——',
  '那我们还等什么',
  '「那就快点出发吧',
  '阿克娅这家伙肯定又在打什么鬼主意',
  '我一边这么想着',
  '一边跟在阿克娅的身后迈出了脚步',
  '就这样——第二段人生的冒险开始了',
  '「喂——你在哪里——',
  '在陌生的城镇里大叫对谁都很失礼吧',
  '「我在这里啦',
  '……这下子伤脑筋了',
  '这家伙的个性竟然这么麻烦',
  '「我从刚才就一直在这里等你啦',
  '「你是在哪里鬼混到现在才回来』',
  '还不快点给我过来',
  '算了——至少她们愿意帮我',
  '总比没人理我好',
  '我这么告诉自己',
  '——这家伙果然是个废材',
  '而且还把我当成同伙了',
  '——算了，反正我也不是什么正经人',
  '也没资格说别人',
  '「…………我说你啊',
  '难道就不能说点好听的话吗',
  '我、我才没有那样的兴趣',
  '这种兴趣可不是一般人能模仿的',
  '「总之，我今天一定要让你看看我的厉害』',
  '让你见识一下我真正的实力',
  '「给我退出啦——',
  '我才不想在第一天就失去冒险者资格',
  '……不过仔细想想',
  '我好像也没有其他选择了',
  '算了，反正我也没想过要回原来的世界',
  '都来到这种地方了',
  '不好好享受一下怎么行',
  '所以说人类真的是一种很容易习惯的生物',
  '我竟然会担心那种事',
  '真是太丢脸了',
  '「喂——惠惠——',
  '「吵死了，别在走廊上大叫啦',
  '啊啊，说得对极了',
  '不过不是用道具',
  '而是用魔法炸死的',
  '「你给我差不多一点——',
  '「你也给我差不多一点——',
  '……结果到头来',
  '我们还是住进了同一家旅馆',
  '——因为没钱了嘛',
  '我抱着这样的想法',
  '打开了旅馆的窗户——',
  '话说回来，这家伙的个性还真是糟糕透顶',
  '才刚认识没多久，就开始指使人了',
  '而且指使人的方式还非常理所当然',
  '——就跟阿克娅一样',
  '「你是不是在想什么很失礼的事』',
  '「没有没有，我什么都没想',
  '——这下真的伤脑筋了',
  '我到底在期待什么啊',
]

const STORAGE_KEY = 'books_novel_progress'

interface Progress {
  currentIdx: number
  enabled: boolean
}

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* */ }
  return { currentIdx: 0, enabled: false }
}

function saveProgress(p: Progress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch { /* */ }
}

export const useNovelStore = defineStore('novel', () => {
  const init = loadProgress()
  const enabled = ref(init.enabled)
  // 句子列表在 store 创建时立即加载
  const sentences = ref<string[]>([...NOVEL_SENTENCES])
  const currentIdx = ref(init.enabled ? init.currentIdx : 0)
  const loading = ref(false)

  watch([enabled, currentIdx], () => {
    saveProgress({ currentIdx: currentIdx.value, enabled: enabled.value })
  }, { deep: true })

  const scrollTick = ref(0)

  function bump() {
    enabled.value = true
    currentIdx.value = 0
    scrollTick.value++
    saveProgress({ currentIdx: currentIdx.value, enabled: enabled.value })
  }

  function scrollToFirst() {
    scrollTick.value++
  }

  function currentSentence(): string {
    const len = sentences.value.length
    if (len === 0) return ''
    return sentences.value[currentIdx.value % len]
  }

  function nextSentence(): string {
    const len = sentences.value.length
    if (len === 0) return ''
    const s = sentences.value[currentIdx.value % len]
    currentIdx.value++
    saveProgress({ currentIdx: currentIdx.value, enabled: enabled.value })
    return s
  }

  return {
    enabled, sentences, currentIdx, loading,
    bump, scrollToFirst, scrollTick, currentSentence, nextSentence
  }
})
