@servers(['apis' => ['root@174.138.15.49']])

@php
$repo = "git@mentortemple.github.com:mentortemple/mentortemple.git";
$releaseDir = '/opt/mentortemple/releases';
$release = 'release_' . date('Y-m-d-H-i');
@endphp

@macro('deploy', ['on' => 'apis'])
  fetch_repo
  run_npm_install
  setup_env
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

@task('setup_env')
  cd {{ $releaseDir }}/{{ $release }};
  cp .env.prod .env
@endtask

@task('build_nuxt')
  cd {{ $releaseDir }}/{{ $release }};
  npm run build
@endtask

@task('restart_pm2')
  pm2 delete 'mentortemple' || true;
  cd {{ $releaseDir }}/{{ $release }};
  NODE_ENV=production pm2 start npm --name mentortemple -- start
@endtask
