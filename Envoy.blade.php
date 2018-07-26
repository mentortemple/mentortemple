@servers(['bahdcasts-nuxt' => ['root@174.138.15.49']])

@php
$repo = "git@bahdcasts-nuxt.github.com:bahdcoder/bahdcasts-nuxt.git";
$releaseDir = '/opt/bahdcasts-nuxt/releases';
$release = 'release_' . date('Y-m-d-H-i');
@endphp

@macro('deploy', ['on' => 'bahdcasts-nuxt'])
  fetch_repo
  run_npm_install
  build_nuxt
  restart_pm2
@endmacro

@task('fetch_repo')
  [ -d {{ $releaseDir }} ] || mkdir -p {{ $releaseDir }};
  cd {{ $releaseDir }};
  git clone {{ $repo }} {{ $release }};
@endtask

@task('run_npm_install')
  cd {{ $releaseDir }}/{{ $release }};
  npm install;
@endtask

@task('build_nuxt')
  cd {{ $releaseDir }}/{{ $release }};
  npm run build
@endtask

@task('restart_pm2')
  pm2 delete 'bahdcasts-nuxt' || true;
  cd {{ $releaseDir }}/{{ $release }};
  NODE_ENV=production pm2 start npm --name bahdcasts-nuxt -- start
@endtask
