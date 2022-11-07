import ContentLoader from 'react-content-loader';

const SkeletonLoader = (props) => (
  <ContentLoader
    rtl
    speed={3}
    width={288}
    height={461.8}
    viewBox="0 0 288 461.8"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="15" y="330" rx="0" ry="0" width="224" height="43" />
    <rect x="87" y="391" rx="0" ry="0" width="74" height="21" />
    <rect x="83" y="436" rx="0" ry="0" width="84" height="21" />
    <rect x="20" y="258" rx="0" ry="0" width="214" height="40" />
    <rect x="12" y="15" rx="0" ry="0" width="228" height="300" />
  </ContentLoader>
);

export default SkeletonLoader;
