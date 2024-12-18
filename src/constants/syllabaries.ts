import { DifficultyLevel, Syllable } from '../types/game'

// Tipos para organizar mejor las sílabas
interface SyllabaryLevels {
  basico: Syllable[]
  intermedio: Syllable[]
  avanzado: Syllable[]
  maestro: Syllable[]
}

interface SyllabaryCollection {
  hiragana: SyllabaryLevels
  katakana: SyllabaryLevels
  proximamente: SyllabaryLevels
}

// Luego modificamos la función getSyllabarySets
export const getSyllabarySets = (
  syllabaryType: 'hiragana' | 'katakana' | 'proximamente',
  difficulty: DifficultyLevel
): Syllable[] => {
  const sets: SyllabaryCollection = {
    hiragana: {
      basico: HIRAGANA,
      intermedio: [...HIRAGANA, ...HIRAGANA_DAKUTEN],
      avanzado: [...HIRAGANA, ...HIRAGANA_DAKUTEN, ...HIRAGANA_HANDAKUTEN],
      maestro: [
        ...HIRAGANA,
        ...HIRAGANA_DAKUTEN,
        ...HIRAGANA_HANDAKUTEN,
        ...HIRAGANA_COMBO,
      ],
    },
    katakana: {
      basico: KATAKANA,
      intermedio: [...KATAKANA, ...KATAKANA_DAKUTEN],
      avanzado: [...KATAKANA, ...KATAKANA_DAKUTEN, ...KATAKANA_HANDAKUTEN],
      maestro: [
        ...KATAKANA,
        ...KATAKANA_DAKUTEN,
        ...KATAKANA_HANDAKUTEN,
        ...KATAKANA_COMBO,
      ],
    },
    proximamente: {
      basico: [...KATAKANA, ...HIRAGANA],
      intermedio: [
        ...KATAKANA,
        ...HIRAGANA,
        ...KATAKANA_DAKUTEN,
        ...HIRAGANA_DAKUTEN,
      ],
      avanzado: [],
      maestro: [],
    },
  }

  return sets[syllabaryType][difficulty]
}

//  HIRAGANA
export const HIRAGANA: Syllable[] = [
  // Vocales
  { japanese: 'あ', romaji: 'a', type: 'basic', group: 'vocal' },
  { japanese: 'い', romaji: 'i', type: 'basic', group: 'vocal' },
  { japanese: 'う', romaji: 'u', type: 'basic', group: 'vocal' },
  { japanese: 'え', romaji: 'e', type: 'basic', group: 'vocal' },
  { japanese: 'お', romaji: 'o', type: 'basic', group: 'vocal' },
  // K-
  { japanese: 'か', romaji: 'ka', type: 'basic', group: 'k' },
  { japanese: 'き', romaji: 'ki', type: 'basic', group: 'k' },
  { japanese: 'く', romaji: 'ku', type: 'basic', group: 'k' },
  { japanese: 'け', romaji: 'ke', type: 'basic', group: 'k' },
  { japanese: 'こ', romaji: 'ko', type: 'basic', group: 'k' },
  // S-
  { japanese: 'さ', romaji: 'sa', type: 'basic', group: 's' },
  { japanese: 'し', romaji: 'shi', type: 'basic', group: 's' },
  { japanese: 'す', romaji: 'su', type: 'basic', group: 's' },
  { japanese: 'せ', romaji: 'se', type: 'basic', group: 's' },
  { japanese: 'そ', romaji: 'so', type: 'basic', group: 's' },
  // T-
  { japanese: 'た', romaji: 'ta', type: 'basic', group: 't' },
  { japanese: 'ち', romaji: 'chi', type: 'basic', group: 't' },
  { japanese: 'つ', romaji: 'tsu', type: 'basic', group: 't' },
  { japanese: 'て', romaji: 'te', type: 'basic', group: 't' },
  { japanese: 'と', romaji: 'to', type: 'basic', group: 't' },
  // N-
  { japanese: 'な', romaji: 'na', type: 'basic', group: 'n' },
  { japanese: 'に', romaji: 'ni', type: 'basic', group: 'n' },
  { japanese: 'ぬ', romaji: 'nu', type: 'basic', group: 'n' },
  { japanese: 'ね', romaji: 'ne', type: 'basic', group: 'n' },
  { japanese: 'の', romaji: 'no', type: 'basic', group: 'n' },
  // H-
  { japanese: 'は', romaji: 'ha', type: 'basic', group: 'h' },
  { japanese: 'ひ', romaji: 'hi', type: 'basic', group: 'h' },
  { japanese: 'ふ', romaji: 'fu', type: 'basic', group: 'h' },
  { japanese: 'へ', romaji: 'he', type: 'basic', group: 'h' },
  { japanese: 'ほ', romaji: 'ho', type: 'basic', group: 'h' },
  // M-
  { japanese: 'ま', romaji: 'ma', type: 'basic', group: 'm' },
  { japanese: 'み', romaji: 'mi', type: 'basic', group: 'm' },
  { japanese: 'む', romaji: 'mu', type: 'basic', group: 'm' },
  { japanese: 'め', romaji: 'me', type: 'basic', group: 'm' },
  { japanese: 'も', romaji: 'mo', type: 'basic', group: 'm' },
  // Y-
  { japanese: 'や', romaji: 'ya', type: 'basic', group: 'y' },
  { japanese: 'ゆ', romaji: 'yu', type: 'basic', group: 'y' },
  { japanese: 'よ', romaji: 'yo', type: 'basic', group: 'y' },
  // R-
  { japanese: 'ら', romaji: 'ra', type: 'basic', group: 'r' },
  { japanese: 'り', romaji: 'ri', type: 'basic', group: 'r' },
  { japanese: 'る', romaji: 'ru', type: 'basic', group: 'r' },
  { japanese: 'れ', romaji: 're', type: 'basic', group: 'r' },
  { japanese: 'ろ', romaji: 'ro', type: 'basic', group: 'r' },
  // W-
  { japanese: 'わ', romaji: 'wa', type: 'basic', group: 'w' },
  { japanese: 'を', romaji: 'wo', type: 'basic', group: 'w' },
  // N
  { japanese: 'ん', romaji: 'n', type: 'basic', group: 'n' },
]

// Hiragana con dakuten
export const HIRAGANA_DAKUTEN: Syllable[] = [
  // G-
  { japanese: 'が', romaji: 'ga', type: 'dakuten', group: 'g' },
  { japanese: 'ぎ', romaji: 'gi', type: 'dakuten', group: 'g' },
  { japanese: 'ぐ', romaji: 'gu', type: 'dakuten', group: 'g' },
  { japanese: 'げ', romaji: 'ge', type: 'dakuten', group: 'g' },
  { japanese: 'ご', romaji: 'go', type: 'dakuten', group: 'g' },
  // Z-
  { japanese: 'ざ', romaji: 'za', type: 'dakuten', group: 'z' },
  { japanese: 'じ', romaji: 'ji', type: 'dakuten', group: 'z' },
  { japanese: 'ず', romaji: 'zu', type: 'dakuten', group: 'z' },
  { japanese: 'ぜ', romaji: 'ze', type: 'dakuten', group: 'z' },
  { japanese: 'ぞ', romaji: 'zo', type: 'dakuten', group: 'z' },
  // D-
  { japanese: 'だ', romaji: 'da', type: 'dakuten', group: 'd' },
  { japanese: 'ぢ', romaji: 'ji', type: 'dakuten', group: 'd' },
  { japanese: 'づ', romaji: 'zu', type: 'dakuten', group: 'd' },
  { japanese: 'で', romaji: 'de', type: 'dakuten', group: 'd' },
  { japanese: 'ど', romaji: 'do', type: 'dakuten', group: 'd' },
  // B-
  { japanese: 'ば', romaji: 'ba', type: 'dakuten', group: 'b' },
  { japanese: 'び', romaji: 'bi', type: 'dakuten', group: 'b' },
  { japanese: 'ぶ', romaji: 'bu', type: 'dakuten', group: 'b' },
  { japanese: 'べ', romaji: 'be', type: 'dakuten', group: 'b' },
  { japanese: 'ぼ', romaji: 'bo', type: 'dakuten', group: 'b' },
]

// Hiragana con handakuten
export const HIRAGANA_HANDAKUTEN: Syllable[] = [
  // P-
  { japanese: 'ぱ', romaji: 'pa', type: 'handakuten', group: 'p' },
  { japanese: 'ぴ', romaji: 'pi', type: 'handakuten', group: 'p' },
  { japanese: 'ぷ', romaji: 'pu', type: 'handakuten', group: 'p' },
  { japanese: 'ぺ', romaji: 'pe', type: 'handakuten', group: 'p' },
  { japanese: 'ぽ', romaji: 'po', type: 'handakuten', group: 'p' },
  
]
// Hiragana combinaciones (yōon)
export const HIRAGANA_COMBO: Syllable[] = [
  // KY-
  { japanese: 'きょ', romaji: 'kyo', type: 'combo', group: 'ky' },
  { japanese: 'きゅ', romaji: 'kyu', type: 'combo', group: 'ky' },
  { japanese: 'きゃ', romaji: 'kya', type: 'combo', group: 'ky' },
  // SH-
  { japanese: 'しょ', romaji: 'sho', type: 'combo', group: 'sh' },
  { japanese: 'しゅ', romaji: 'shu', type: 'combo', group: 'sh' },
  { japanese: 'しゃ', romaji: 'sha', type: 'combo', group: 'sh' },
  { japanese: 'ちゃ', romaji: 'cha', type: 'combo', group: 'ch' },
  { japanese: 'ちゅ', romaji: 'chu', type: 'combo', group: 'ch' },
  { japanese: 'ちょ', romaji: 'cho', type: 'combo', group: 'ch' },
  // NY-
  { japanese: 'にゃ', romaji: 'nya', type: 'combo', group: 'ny' },
  { japanese: 'にゅ', romaji: 'nyu', type: 'combo', group: 'ny' },
  { japanese: 'にょ', romaji: 'nyo', type: 'combo', group: 'ny' },
  // HY-
  { japanese: 'ひゃ', romaji: 'hya', type: 'combo', group: 'hy' },
  { japanese: 'ひゅ', romaji: 'hyu', type: 'combo', group: 'hy' },
  { japanese: 'ひょ', romaji: 'hyo', type: 'combo', group: 'hy' },
  // MY-
  { japanese: 'みゃ', romaji: 'mya', type: 'combo', group: 'my' },
  { japanese: 'みゅ', romaji: 'myu', type: 'combo', group: 'my' },
  { japanese: 'みょ', romaji: 'myo', type: 'combo', group: 'my' },
  // RY-
  { japanese: 'りゃ', romaji: 'rya', type: 'combo', group: 'ry' },
  { japanese: 'りゅ', romaji: 'ryu', type: 'combo', group: 'ry' },
  { japanese: 'りょ', romaji: 'ryo', type: 'combo', group: 'ry' },
  // GY-
  { japanese: 'ぎゃ', romaji: 'gya', type: 'combo', group: 'gy' },
  { japanese: 'ぎゅ', romaji: 'gyu', type: 'combo', group: 'gy' },
  { japanese: 'ぎょ', romaji: 'gyo', type: 'combo', group: 'gy' },
  // JY-
  { japanese: 'じゃ', romaji: 'ja', type: 'combo', group: 'j' },
  { japanese: 'じゅ', romaji: 'ju', type: 'combo', group: 'j' },
  { japanese: 'じょ', romaji: 'jo', type: 'combo', group: 'j' },
  // BY-
  { japanese: 'びゃ', romaji: 'bya', type: 'combo', group: 'by' },
  { japanese: 'びゅ', romaji: 'byu', type: 'combo', group: 'by' },
  { japanese: 'びょ', romaji: 'byo', type: 'combo', group: 'by' },
  // PY-
  { japanese: 'ぴゃ', romaji: 'pya', type: 'combo', group: 'py' },
  { japanese: 'ぴゅ', romaji: 'pyu', type: 'combo', group: 'py' },
  { japanese: 'ぴょ', romaji: 'pyo', type: 'combo', group: 'py' },
]

export const KATAKANA: Syllable[] = [
  // Vocales
  { japanese: 'ア', romaji: 'a', type: 'basic', group: 'vocal' },
  { japanese: 'イ', romaji: 'i', type: 'basic', group: 'vocal' },
  { japanese: 'ウ', romaji: 'u', type: 'basic', group: 'vocal' },
  { japanese: 'エ', romaji: 'e', type: 'basic', group: 'vocal' },
  { japanese: 'オ', romaji: 'o', type: 'basic', group: 'vocal' },
  // K-
  { japanese: 'カ', romaji: 'ka', type: 'basic', group: 'k' },
  { japanese: 'キ', romaji: 'ki', type: 'basic', group: 'k' },
  { japanese: 'ク', romaji: 'ku', type: 'basic', group: 'k' },
  { japanese: 'ケ', romaji: 'ke', type: 'basic', group: 'k' },
  { japanese: 'コ', romaji: 'ko', type: 'basic', group: 'k' },
  // S-
  { japanese: 'サ', romaji: 'sa', type: 'basic', group: 's' },
  { japanese: 'シ', romaji: 'shi', type: 'basic', group: 's' },
  { japanese: 'ス', romaji: 'su', type: 'basic', group: 's' },
  { japanese: 'セ', romaji: 'se', type: 'basic', group: 's' },
  { japanese: 'ソ', romaji: 'so', type: 'basic', group: 's' },
  // T-
  { japanese: 'タ', romaji: 'ta', type: 'basic', group: 't' },
  { japanese: 'チ', romaji: 'chi', type: 'basic', group: 't' },
  { japanese: 'ツ', romaji: 'tsu', type: 'basic', group: 't' },
  { japanese: 'テ', romaji: 'te', type: 'basic', group: 't' },
  { japanese: 'ト', romaji: 'to', type: 'basic', group: 't' },
  // N-
  { japanese: 'ナ', romaji: 'na', type: 'basic', group: 'n' },
  { japanese: 'ニ', romaji: 'ni', type: 'basic', group: 'n' },
  { japanese: 'ヌ', romaji: 'nu', type: 'basic', group: 'n' },
  { japanese: 'ネ', romaji: 'ne', type: 'basic', group: 'n' },
  { japanese: 'ノ', romaji: 'no', type: 'basic', group: 'n' },
  // H-
  { japanese: 'ハ', romaji: 'ha', type: 'basic', group: 'h' },
  { japanese: 'ヒ', romaji: 'hi', type: 'basic', group: 'h' },
  { japanese: 'フ', romaji: 'fu', type: 'basic', group: 'h' },
  { japanese: 'ヘ', romaji: 'he', type: 'basic', group: 'h' },
  { japanese: 'ホ', romaji: 'ho', type: 'basic', group: 'h' },
  // M-
  { japanese: 'マ', romaji: 'ma', type: 'basic', group: 'm' },
  { japanese: 'ミ', romaji: 'mi', type: 'basic', group: 'm' },
  { japanese: 'ム', romaji: 'mu', type: 'basic', group: 'm' },
  { japanese: 'メ', romaji: 'me', type: 'basic', group: 'm' },
  { japanese: 'モ', romaji: 'mo', type: 'basic', group: 'm' },
  // Y-
  { japanese: 'ヤ', romaji: 'ya', type: 'basic', group: 'y' },
  { japanese: 'ユ', romaji: 'yu', type: 'basic', group: 'y' },
  { japanese: 'ヨ', romaji: 'yo', type: 'basic', group: 'y' },
  // R-
  { japanese: 'ラ', romaji: 'ra', type: 'basic', group: 'r' },
  { japanese: 'リ', romaji: 'ri', type: 'basic', group: 'r' },
  { japanese: 'ル', romaji: 'ru', type: 'basic', group: 'r' },
  { japanese: 'レ', romaji: 're', type: 'basic', group: 'r' },
  { japanese: 'ロ', romaji: 'ro', type: 'basic', group: 'r' },
  // W-
  { japanese: 'ワ', romaji: 'wa', type: 'basic', group: 'w' },
  { japanese: 'ヲ', romaji: 'wo', type: 'basic', group: 'w' },
  // N
  { japanese: 'ン', romaji: 'n', type: 'basic', group: 'n' },
]

//  Katakana con dakuten
export const KATAKANA_DAKUTEN: Syllable[] = [
  // G-
  { japanese: 'ガ', romaji: 'ga', type: 'dakuten', group: 'g' },
  { japanese: 'ギ', romaji: 'gi', type: 'dakuten', group: 'g' },
  { japanese: 'グ', romaji: 'gu', type: 'dakuten', group: 'g' },
  { japanese: 'ゲ', romaji: 'ge', type: 'dakuten', group: 'g' },
  { japanese: 'ゴ', romaji: 'go', type: 'dakuten', group: 'g' },
  // Z-
  { japanese: 'ザ', romaji: 'za', type: 'dakuten', group: 'z' },
  { japanese: 'ジ', romaji: 'ji', type: 'dakuten', group: 'z' },
  { japanese: 'ズ', romaji: 'zu', type: 'dakuten', group: 'z' },
  { japanese: 'ゼ', romaji: 'ze', type: 'dakuten', group: 'z' },
  { japanese: 'ゾ', romaji: 'zo', type: 'dakuten', group: 'z' },
  // D-
  { japanese: 'ダ', romaji: 'da', type: 'dakuten', group: 'd' },
  { japanese: 'ヂ', romaji: 'ji', type: 'dakuten', group: 'd' },
  { japanese: 'ヅ', romaji: 'zu', type: 'dakuten', group: 'd' },
  { japanese: 'デ', romaji: 'de', type: 'dakuten', group: 'd' },
  { japanese: 'ド', romaji: 'do', type: 'dakuten', group: 'd' },
  // B-
  { japanese: 'バ', romaji: 'ba', type: 'dakuten', group: 'b' },
  { japanese: 'ビ', romaji: 'bi', type: 'dakuten', group: 'b' },
  { japanese: 'ブ', romaji: 'bu', type: 'dakuten', group: 'b' },
  { japanese: 'ベ', romaji: 'be', type: 'dakuten', group: 'b' },
  { japanese: 'ボ', romaji: 'bo', type: 'dakuten', group: 'b' },
]

// Katakana con handakuten
export const KATAKANA_HANDAKUTEN: Syllable[] = [
  // P-
  { japanese: 'パ', romaji: 'pa', type: 'handakuten', group: 'p' },
  { japanese: 'ピ', romaji: 'pi', type: 'handakuten', group: 'p' },
  { japanese: 'プ', romaji: 'pu', type: 'handakuten', group: 'p' },
  { japanese: 'ペ', romaji: 'pe', type: 'handakuten', group: 'p' },
  { japanese: 'ポ', romaji: 'po', type: 'handakuten', group: 'p' },
  // B-
  { japanese: 'バ', romaji: 'ba', type: 'handakuten', group: 'b' },
  { japanese: 'ビ', romaji: 'bi', type: 'handakuten', group: 'b' },
  { japanese: 'ブ', romaji: 'bu', type: 'handakuten', group: 'b' },
  { japanese: 'ベ', romaji: 'be', type: 'handakuten', group: 'b' },
  { japanese: 'ボ', romaji: 'bo', type: 'handakuten', group: 'b' },
]

// Katakana combinaciones (yōon)
export const KATAKANA_COMBO: Syllable[] = [
  // KY-
  { japanese: 'キャ', romaji: 'kya', type: 'combo', group: 'ky' },
  { japanese: 'キュ', romaji: 'kyu', type: 'combo', group: 'ky' },
  { japanese: 'キョ', romaji: 'kyo', type: 'combo', group: 'ky' },
  // SHY-
  { japanese: 'シャ', romaji: 'sha', type: 'combo', group: 'sh' },
  { japanese: 'シュ', romaji: 'shu', type: 'combo', group: 'sh' },
  { japanese: 'ショ', romaji: 'sho', type: 'combo', group: 'sh' },
  // CHY-
  { japanese: 'チャ', romaji: 'cha', type: 'combo', group: 'ch' },
  { japanese: 'チュ', romaji: 'chu', type: 'combo', group: 'ch' },
  { japanese: 'チョ', romaji: 'cho', type: 'combo', group: 'ch' },
  // JY- (no hay combinaciones de JY)
  // SY-
  { japanese: 'シャ', romaji: 'sha', type: 'combo', group: 'sh' },
  { japanese: 'シュ', romaji: 'shu', type: 'combo', group: 'sh' },
  { japanese: 'ショ', romaji: 'sho', type: 'combo', group: 'sh' },
  // NY-
  { japanese: 'ニャ', romaji: 'nya', type: 'combo', group: 'ny' },
  { japanese: 'ニュ', romaji: 'nyu', type: 'combo', group: 'ny' },
  { japanese: 'ニョ', romaji: 'nyo', type: 'combo', group: 'ny' },
  // HY-
  { japanese: 'ヒャ', romaji: 'hya', type: 'combo', group: 'hy' },
  { japanese: 'ヒュ', romaji: 'hyu', type: 'combo', group: 'hy' },
  { japanese: 'ヒョ', romaji: 'hyo', type: 'combo', group: 'hy' },
  // MY-
  { japanese: 'ミャ', romaji: 'mya', type: 'combo', group: 'my' },
  { japanese: 'ミュ', romaji: 'myu', type: 'combo', group: 'my' },
  { japanese: 'ミョ', romaji: 'myo', type: 'combo', group: 'my' },
  // RY-
  { japanese: 'リャ', romaji: 'rya', type: 'combo', group: 'ry' },
  { japanese: 'リュ', romaji: 'ryu', type: 'combo', group: 'ry' },
  { japanese: 'リョ', romaji: 'ryo', type: 'combo', group: 'ry' },
  // GY-
  { japanese: 'ギャ', romaji: 'gya', type: 'combo', group: 'gy' },
  { japanese: 'ギュ', romaji: 'gyu', type: 'combo', group: 'gy' },
  { japanese: 'ギョ', romaji: 'gyo', type: 'combo', group: 'gy' },
  // JY-
  { japanese: 'ジャ', romaji: 'ja', type: 'combo', group: 'j' },
  { japanese: 'ジュ', romaji: 'ju', type: 'combo', group: 'j' },
  { japanese: 'ジョ', romaji: 'jo', type: 'combo', group: 'j' },
  // BY-
  { japanese: 'ビャ', romaji: 'bya', type: 'combo', group: 'by' },
  { japanese: 'ビュ', romaji: 'byu', type: 'combo', group: 'by' },
  { japanese: 'ビョ', romaji: 'byo', type: 'combo', group: 'by' },
  // PY-
  { japanese: 'ピャ', romaji: 'pya', type: 'combo', group: 'py' },
  { japanese: 'ピュ', romaji: 'pyu', type: 'combo', group: 'py' },
  { japanese: 'ピョ', romaji: 'pyo', type: 'combo', group: 'py' },
]
