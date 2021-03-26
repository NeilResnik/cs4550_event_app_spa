# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EventAppServer.Repo.insert!(%EventAppServer.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias EventAppServer.Repo
alias EventAppServer.Users.User
alias EventAppServer.Events.Event

defmodule Inject do
  def user(name, email, pass) do
    hash = Argon2.hash_pwd_salt(pass)
    Repo.insert!(%User{name: name, email: email, password_hash: hash})
  end
end

alice = Inject.user("alice", "alice@gmail.com", "test1")
bob = Inject.user("bob", "bob@gmail.com", "test2")

event1 = %Event{
  name: "Alice's Birthday Bash",
  date: ~D[2023-08-17],
  description: "There will be pizza!",
  user_id: alice.id
}
Repo.insert(event1);
