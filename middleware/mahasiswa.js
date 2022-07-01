export default function (context) {
  if (!context.store.state.user.hakAkses.includes('mahasiswa')) {
    context.store.dispatch('isiHakAktif', context.store.state.user.hakAkses[0])
    context.redirect(`/${context.store.state.user.hakAkses[0]}/beranda`)
  }
}
