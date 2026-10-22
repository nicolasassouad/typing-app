export type Language = 'en' | 'fr';

export interface ClassicText {
  title: string;
  author: string;
  text: string;
}

// Public domain excerpts, normalized to keyboard-typable characters
// (straight quotes, no em dashes, "oe" for the ligature)
export const TEXTS: Record<Language, ClassicText[]> = {
  en: [
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      text: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.`,
    },
    {
      title: 'A Tale of Two Cities',
      author: 'Charles Dickens',
      text: `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way.`,
    },
    {
      title: 'Moby-Dick',
      author: 'Herman Melville',
      text: `Call me Ishmael. Some years ago, never mind how long precisely, having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation.`,
    },
    {
      title: 'Hamlet',
      author: 'William Shakespeare',
      text: `To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles
And by opposing end them. To die, to sleep;
No more; and by a sleep to say we end
The heart-ache and the thousand natural shocks
That flesh is heir to: 'tis a consummation
Devoutly to be wish'd.`,
    },
    {
      title: 'Sonnet 18',
      author: 'William Shakespeare',
      text: `Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date;
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm'd;
And every fair from fair sometime declines,
By chance or nature's changing course untrimm'd;
But thy eternal summer shall not fade,
Nor lose possession of that fair thou ow'st;
Nor shall Death brag thou wander'st in his shade,
When in eternal lines to time thou grow'st:
So long as men can breathe or eyes can see,
So long lives this, and this gives life to thee.`,
    },
    {
      title: "Alice's Adventures in Wonderland",
      author: 'Lewis Carroll',
      text: `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversations?"`,
    },
    {
      title: 'Jane Eyre',
      author: 'Charlotte Bronte',
      text: `There was no possibility of taking a walk that day. We had been wandering, indeed, in the leafless shrubbery an hour in the morning; but since dinner (Mrs. Reed, when there was no company, dined early) the cold winter wind had brought with it clouds so sombre, and a rain so penetrating, that further out-door exercise was now out of the question.`,
    },
    {
      title: 'Anna Karenina',
      author: 'Leo Tolstoy (tr. Constance Garnett)',
      text: `Happy families are all alike; every unhappy family is unhappy in its own way. Everything was in confusion in the Oblonskys' house. The wife had discovered that the husband was carrying on an intrigue with a French girl, who had been a governess in their family, and she had announced to her husband that she could not go on living in the same house with him.`,
    },
    {
      title: 'The Gettysburg Address',
      author: 'Abraham Lincoln',
      text: `Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war.`,
    },
    {
      title: 'The Declaration of Independence',
      author: 'Thomas Jefferson',
      text: `We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness. That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed.`,
    },
  ],
  fr: [
    {
      title: 'Du côté de chez Swann',
      author: 'Marcel Proust',
      text: `Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n'avais pas le temps de me dire : "Je m'endors." Et, une demi-heure après, la pensée qu'il était temps de chercher le sommeil m'éveillait ; je voulais poser le volume que je croyais avoir encore dans les mains et souffler ma lumière.`,
    },
    {
      title: 'Les Misérables',
      author: 'Victor Hugo',
      text: `En 1815, M. Charles-François-Bienvenu Myriel était évêque de Digne. C'était un vieillard d'environ soixante-quinze ans ; il occupait le siège de Digne depuis 1806. Quoique ce détail ne touche en aucune manière au fond même de ce que nous avons à raconter, il n'est peut-être pas inutile, ne fût-ce que pour être exact en tout, d'indiquer ici les bruits et les propos qui avaient couru sur son compte au moment où il était arrivé dans le diocèse.`,
    },
    {
      title: "Demain, dès l'aube",
      author: 'Victor Hugo',
      text: `Demain, dès l'aube, à l'heure où blanchit la campagne,
Je partirai. Vois-tu, je sais que tu m'attends.
J'irai par la forêt, j'irai par la montagne.
Je ne puis demeurer loin de toi plus longtemps.
Je marcherai les yeux fixés sur mes pensées,
Sans rien voir au dehors, sans entendre aucun bruit,
Seul, inconnu, le dos courbé, les mains croisées,
Triste, et le jour pour moi sera comme la nuit.`,
    },
    {
      title: 'Le Corbeau et le Renard',
      author: 'Jean de La Fontaine',
      text: `Maître Corbeau, sur un arbre perché,
Tenait en son bec un fromage.
Maître Renard, par l'odeur alléché,
Lui tint à peu près ce langage :
"Hé ! bonjour, Monsieur du Corbeau.
Que vous êtes joli ! que vous me semblez beau !
Sans mentir, si votre ramage
Se rapporte à votre plumage,
Vous êtes le Phénix des hôtes de ces bois."`,
    },
    {
      title: "L'Albatros",
      author: 'Charles Baudelaire',
      text: `Souvent, pour s'amuser, les hommes d'équipage
Prennent des albatros, vastes oiseaux des mers,
Qui suivent, indolents compagnons de voyage,
Le navire glissant sur les gouffres amers.`,
    },
    {
      title: "Chanson d'automne",
      author: 'Paul Verlaine',
      text: `Les sanglots longs
Des violons
De l'automne
Blessent mon coeur
D'une langueur
Monotone.`,
    },
    {
      title: 'Candide',
      author: 'Voltaire',
      text: `Il y avait en Westphalie, dans le château de M. le baron de Thunder-ten-tronckh, un jeune garçon à qui la nature avait donné les moeurs les plus douces. Sa physionomie annonçait son âme. Il avait le jugement assez droit, avec l'esprit le plus simple ; c'est, je crois, pour cette raison qu'on le nommait Candide.`,
    },
    {
      title: 'Du contrat social',
      author: 'Jean-Jacques Rousseau',
      text: `L'homme est né libre, et partout il est dans les fers. Tel se croit le maître des autres, qui ne laisse pas d'être plus esclave qu'eux. Comment ce changement s'est-il fait ? Je l'ignore. Qu'est-ce qui peut le rendre légitime ? Je crois pouvoir résoudre cette question.`,
    },
    {
      title: 'Les Trois Mousquetaires',
      author: 'Alexandre Dumas',
      text: `Le premier lundi du mois d'avril 1625, le bourg de Meung, où naquit l'auteur du Roman de la Rose, semblait être dans une révolution aussi entière que si les huguenots en fussent venus faire une seconde Rochelle.`,
    },
    {
      title: 'Pensées',
      author: 'Blaise Pascal',
      text: `L'homme n'est qu'un roseau, le plus faible de la nature ; mais c'est un roseau pensant. Il ne faut pas que l'univers entier s'arme pour l'écraser : une vapeur, une goutte d'eau, suffit pour le tuer. Mais, quand l'univers l'écraserait, l'homme serait encore plus noble que ce qui le tue, puisqu'il sait qu'il meurt, et l'avantage que l'univers a sur lui ; l'univers n'en sait rien.`,
    },
  ],
};
