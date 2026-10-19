Downloading six-1.17.0-py2.py3-none-any.whl (11 kB)
Downloading typing_inspection-0.4.2-py3-none-any.whl (14 kB)
Downloading hpack-4.2.0-py3-none-any.whl (34 kB)
Downloading hyperframe-6.1.0-py3-none-any.whl (13 kB)
Installing collected packages: strenum, websockets, typing-extensions, sniffio, six, python-dotenv, PyJWT, psycopg2-binary, pluggy, packaging, MarkupSafe, itsdangerous, iniconfig, idna, hyperframe, hpack, h11, greenlet, click, certifi, blinker, annotated-types, Werkzeug, typing-inspection, SQLAlchemy, python-dateutil, pytest, pydantic-core, Mako, Jinja2, httpcore, h2, gunicorn, deprecation, anyio, pydantic, httpx, Flask, alembic, realtime, pytest-flask, Flask-SQLAlchemy, Flask-JWT-Extended, flask-cors, supafunc, storage3, postgrest, gotrue, Flask-Migrate, supabase
Successfully installed Flask-3.0.3 Flask-JWT-Extended-4.6.0 Flask-Migrate-4.0.7 Flask-SQLAlchemy-3.1.1 Jinja2-3.1.6 Mako-1.3.12 MarkupSafe-3.0.3 PyJWT-2.13.0 SQLAlchemy-2.0.31 Werkzeug-3.0.3 alembic-1.18.5 annotated-types-0.7.0 anyio-4.14.2 blinker-1.9.0 certifi-2026.6.17 click-8.4.2 deprecation-2.1.0 flask-cors-4.0.1 gotrue-2.12.4 greenlet-3.5.3 gunicorn-22.0.0 h11-0.16.0 h2-4.3.0 hpack-4.2.0 httpcore-1.0.9 httpx-0.27.2 hyperframe-6.1.0 idna-3.18 iniconfig-2.3.0 itsdangerous-2.2.0 packaging-26.2 pluggy-1.6.0 postgrest-0.16.11 psycopg2-binary-2.9.9 pydantic-2.13.4 pydantic-core-2.46.4 pytest-8.3.2 pytest-flask-1.3.0 python-dateutil-2.9.0.post0 python-dotenv-1.0.1 realtime-2.31.0 six-1.17.0 sniffio-1.3.1 storage3-0.7.7 strenum-0.4.15 supabase-2.7.4 supafunc-0.5.1 typing-extensions-4.16.0 typing-inspection-0.4.2 websockets-15.0.1
Traceback (most recent call last):
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 146, in __init__
    self._dbapi_connection = engine.raw_connection()
                             ^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 3300, in raw_connection
    return self.pool.connect()
           ^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 449, in connect
    return _ConnectionFairy._checkout(self)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 1263, in _checkout
    fairy = _ConnectionRecord.checkout(pool)
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 712, in checkout
    rec = pool._do_get()
          ^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/impl.py", line 179, in _do_get
    with util.safe_reraise():
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py", line 146, in __exit__
    raise exc_value.with_traceback(exc_tb)
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/impl.py", line 177, in _do_get
    return self._create_connection()
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 390, in _create_connection
    return _ConnectionRecord(self)
           ^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 674, in __init__
    self.__connect()
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 900, in __connect
    with util.safe_reraise():
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py", line 146, in __exit__
    raise exc_value.with_traceback(exc_tb)
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 896, in __connect
    self.dbapi_connection = connection = pool._invoke_creator(self)
                                         ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/create.py", line 643, in connect
    return dialect.connect(*cargs, **cparams)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 620, in connect
    return self.loaded_dbapi.connect(*cargs, **cparams)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/psycopg2/__init__.py", line 122, in connect
    conn = _connect(dsn, connection_factory=connection_factory, **kwasync)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
psycopg2.OperationalError: could not translate host name "host" to address: Temporary failure in name resolution


The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "/home/yassin/jobLens-1/backend/venv/bin/flask", line 8, in <module>
    sys.exit(main())
             ^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/flask/cli.py", line 1105, in main
    cli.main()
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/core.py", line 1490, in main
    rv = self.invoke(ctx)
         ^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/core.py", line 1970, in invoke
    return _process_result(sub_ctx.command.invoke(sub_ctx))
                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/core.py", line 1970, in invoke
    return _process_result(sub_ctx.command.invoke(sub_ctx))
                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/core.py", line 1353, in invoke
    return ctx.invoke(self.callback, **ctx.params)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/core.py", line 907, in invoke
    return callback(*args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/decorators.py", line 34, in new_func
    return f(get_current_context(), *args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/flask/cli.py", line 386, in decorator
    return ctx.invoke(f, *args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/core.py", line 907, in invoke
    return callback(*args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/flask_migrate/cli.py", line 109, in migrate
    _migrate(directory, message, sql, head, splice, branch_label, version_path,
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/flask_migrate/__init__.py", line 111, in wrapped
    f(*args, **kwargs)
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/flask_migrate/__init__.py", line 170, in migrate
    command.revision(config, message, autogenerate=True, sql=sql,
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/alembic/command.py", line 309, in revision
    script_directory.run_env()
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/alembic/script/base.py", line 556, in run_env
    util.load_python_file(self.dir, "env.py")
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/alembic/util/pyfiles.py", line 116, in load_python_file
    module = load_module_py(module_id, path)
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/alembic/util/pyfiles.py", line 136, in load_module_py
    spec.loader.exec_module(module)  # type: ignore
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<frozen importlib._bootstrap_external>", line 995, in exec_module
  File "<frozen importlib._bootstrap>", line 488, in _call_with_frames_removed
  File "/home/yassin/jobLens-1/backend/migrations/env.py", line 68, in <module>
    run_migrations_online()
  File "/home/yassin/jobLens-1/backend/migrations/env.py", line 58, in run_migrations_online
    with connectable.connect() as connection:
         ^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 3276, in connect
    return self._connection_cls(self)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 148, in __init__
    Connection._handle_dbapi_exception_noconnection(
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 2440, in _handle_dbapi_exception_noconnection
    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 146, in __init__
    self._dbapi_connection = engine.raw_connection()
                             ^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 3300, in raw_connection
    return self.pool.connect()
           ^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 449, in connect
    return _ConnectionFairy._checkout(self)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 1263, in _checkout
    fairy = _ConnectionRecord.checkout(pool)
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 712, in checkout
    rec = pool._do_get()
          ^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/impl.py", line 179, in _do_get
    with util.safe_reraise():
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py", line 146, in __exit__
    raise exc_value.with_traceback(exc_tb)
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/impl.py", line 177, in _do_get
    return self._create_connection()
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 390, in _create_connection
    return _ConnectionRecord(self)
           ^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 674, in __init__
    self.__connect()
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 900, in __connect
    with util.safe_reraise():
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py", line 146, in __exit__
    raise exc_value.with_traceback(exc_tb)
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 896, in __connect
    self.dbapi_connection = connection = pool._invoke_creator(self)
                                         ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/create.py", line 643, in connect
    return dialect.connect(*cargs, **cparams)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 620, in connect
    return self.loaded_dbapi.connect(*cargs, **cparams)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/psycopg2/__init__.py", line 122, in connect
    conn = _connect(dsn, connection_factory=connection_factory, **kwasync)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) could not translate host name "host" to address: Temporary failure in name resolution

(Background on this error at: https://sqlalche.me/e/20/e3q8)
Traceback (most recent call last):
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 146, in __init__
    self._dbapi_connection = engine.raw_connection()
                             ^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 3300, in raw_connection
    return self.pool.connect()
           ^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 449, in connect
    return _ConnectionFairy._checkout(self)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 1263, in _checkout
    fairy = _ConnectionRecord.checkout(pool)
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 712, in checkout
    rec = pool._do_get()
          ^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/impl.py", line 179, in _do_get
    with util.safe_reraise():
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py", line 146, in __exit__
    raise exc_value.with_traceback(exc_tb)
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/impl.py", line 177, in _do_get
    return self._create_connection()
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 390, in _create_connection
    return _ConnectionRecord(self)
           ^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 674, in __init__
    self.__connect()
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 900, in __connect
    with util.safe_reraise():
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py", line 146, in __exit__
    raise exc_value.with_traceback(exc_tb)
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 896, in __connect
    self.dbapi_connection = connection = pool._invoke_creator(self)
                                         ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/create.py", line 643, in connect
    return dialect.connect(*cargs, **cparams)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 620, in connect
    return self.loaded_dbapi.connect(*cargs, **cparams)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/psycopg2/__init__.py", line 122, in connect
    conn = _connect(dsn, connection_factory=connection_factory, **kwasync)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
psycopg2.OperationalError: could not translate host name "host" to address: Temporary failure in name resolution


The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "/home/yassin/jobLens-1/backend/venv/bin/flask", line 8, in <module>
    sys.exit(main())
             ^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/flask/cli.py", line 1105, in main
    cli.main()
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/core.py", line 1490, in main
    rv = self.invoke(ctx)
         ^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/core.py", line 1970, in invoke
    return _process_result(sub_ctx.command.invoke(sub_ctx))
                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/core.py", line 1970, in invoke
    return _process_result(sub_ctx.command.invoke(sub_ctx))
                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/core.py", line 1353, in invoke
    return ctx.invoke(self.callback, **ctx.params)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/core.py", line 907, in invoke
    return callback(*args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/decorators.py", line 34, in new_func
    return f(get_current_context(), *args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/flask/cli.py", line 386, in decorator
    return ctx.invoke(f, *args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/click/core.py", line 907, in invoke
    return callback(*args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/flask_migrate/cli.py", line 154, in upgrade
    _upgrade(directory, revision, sql, tag, x_arg)
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/flask_migrate/__init__.py", line 111, in wrapped
    f(*args, **kwargs)
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/flask_migrate/__init__.py", line 200, in upgrade
    command.upgrade(config, revision, sql=sql, tag=tag)
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/alembic/command.py", line 490, in upgrade
    script.run_env()
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/alembic/script/base.py", line 556, in run_env
    util.load_python_file(self.dir, "env.py")
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/alembic/util/pyfiles.py", line 116, in load_python_file
    module = load_module_py(module_id, path)
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/alembic/util/pyfiles.py", line 136, in load_module_py
    spec.loader.exec_module(module)  # type: ignore
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<frozen importlib._bootstrap_external>", line 995, in exec_module
  File "<frozen importlib._bootstrap>", line 488, in _call_with_frames_removed
  File "/home/yassin/jobLens-1/backend/migrations/env.py", line 68, in <module>
    run_migrations_online()
  File "/home/yassin/jobLens-1/backend/migrations/env.py", line 58, in run_migrations_online
    with connectable.connect() as connection:
         ^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 3276, in connect
    return self._connection_cls(self)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 148, in __init__
    Connection._handle_dbapi_exception_noconnection(
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 2440, in _handle_dbapi_exception_noconnection
    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 146, in __init__
    self._dbapi_connection = engine.raw_connection()
                             ^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 3300, in raw_connection
    return self.pool.connect()
           ^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 449, in connect
    return _ConnectionFairy._checkout(self)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 1263, in _checkout
    fairy = _ConnectionRecord.checkout(pool)
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 712, in checkout
    rec = pool._do_get()
          ^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/impl.py", line 179, in _do_get
    with util.safe_reraise():
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py", line 146, in __exit__
    raise exc_value.with_traceback(exc_tb)
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/impl.py", line 177, in _do_get
    return self._create_connection()
           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 390, in _create_connection
    return _ConnectionRecord(self)
           ^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 674, in __init__
    self.__connect()
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 900, in __connect
    with util.safe_reraise():
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py", line 146, in __exit__
    raise exc_value.with_traceback(exc_tb)
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/pool/base.py", line 896, in __connect
    self.dbapi_connection = connection = pool._invoke_creator(self)
                                         ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/create.py", line 643, in connect
    return dialect.connect(*cargs, **cparams)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 620, in connect
    return self.loaded_dbapi.connect(*cargs, **cparams)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/yassin/jobLens-1/backend/venv/lib/python3.12/site-packages/psycopg2/__init__.py", line 122, in connect
    conn = _connect(dsn, connection_factory=connection_factory, **kwasync)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) could not translate host name "host" to address: Temporary failure in name resolution


