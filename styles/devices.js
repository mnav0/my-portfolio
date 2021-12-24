const size = {
    mobile: '414px',
    tabletPortrait: '768px',
    tabletLandscape: '1024px',
    laptop: '1280px',
    desktop: '1440px'
}
  
export const devices = {
    mobile: `(max-width: ${size.mobile})`,
    tabletPortrait: `(max-width: ${size.tabletPortrait})`,
    tabletLandscape: `(max-width: ${size.tabletLandscape})`,
    laptop: `(max-width: ${size.laptop})`,
    desktop: `(max-width: ${size.desktop})`
}