import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Web前後端程技術',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        聊聊前後端程式開發所需要的各項知識與技術，不打算深聊，因為也辦法聊的很深。從HTML、CSS與Javascript，到React、Vue.js、Node.js等等都可以想到就寫。
      </>
    ),
  },
  {
    title: '程式開發邊角料',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        開發過程中會使用到各種工具或技術，VS Code、Webpack、Git、Docker等等的相關內容。
      </>
    ),
  },
  {
    title: '其他技術相關',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        想到什麼就寫什麼，可淺談AI人工智慧、Python、Django、金流API呼叫，甚至Blender!
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
