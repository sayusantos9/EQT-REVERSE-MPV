import {StyleSheet} from 'react-native';

export const palette = {
  navy: '#0D3567', blue: '#0879D8', ocean: '#126FBF', green: '#15996C',
  text: '#193953', secondary: '#617C99', line: '#D7E7F4',
  sky: '#E7F4FE', mint: '#DFF5E9', white: '#FFFFFF',
};

export const authStyles = StyleSheet.create({
  scene: {flex: 1, backgroundColor: '#EAF7FE'},
  safe: {flex: 1},
  scroll: {flexGrow: 1, paddingHorizontal: 26, paddingBottom: 28},
  centered: {alignItems: 'center'},
  logo: {width: 220, height: 149, alignSelf: 'center'},
  smallLogo: {width: 145, height: 99, alignSelf: 'center'},
  title: {color: palette.navy, fontSize: 29, fontWeight: '800', textAlign: 'center'},
  desc: {color: palette.secondary, fontSize: 14, lineHeight: 21, textAlign: 'center'},
  label: {fontSize: 13, fontWeight: '700', color: palette.navy, marginBottom: 8},
  input: {
    borderWidth: 1, borderColor: palette.line, backgroundColor: palette.white,
    borderRadius: 16, height: 54, paddingHorizontal: 16, fontSize: 14,
    color: palette.text, shadowColor: palette.navy, shadowOpacity: 0.04,
    shadowRadius: 6, elevation: 1,
  },
  field: {marginBottom: 17},
  mainButton: {
    borderRadius: 17, backgroundColor: palette.blue, minHeight: 54,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20,
    flexDirection: 'row', gap: 10,
  },
  secondaryButton: {
    borderRadius: 17, backgroundColor: '#E3F1FE', minHeight: 53,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20,
    borderWidth: 1, borderColor: '#D5E9FA',
  },
  buttonTitle: {fontSize: 16, fontWeight: '800', color: '#FFFFFF'},
  secondaryTitle: {fontSize: 15, fontWeight: '700', color: palette.ocean},
  glass: {
    backgroundColor: 'rgba(255,255,255,0.94)', borderRadius: 25,
    borderWidth: 1, borderColor: 'rgba(214,231,244,0.88)',
    padding: 19, shadowColor: '#1C5981', shadowOpacity: 0.05,
    shadowRadius: 12, elevation: 2,
  },
  back: {
    height: 43, width: 43, borderRadius: 22, backgroundColor: 'rgba(255,255,255,.94)',
    alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 6,
    left: 1, zIndex: 4,
  },
});
